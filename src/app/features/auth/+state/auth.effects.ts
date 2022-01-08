import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Router } from "@angular/router";
import { AuthDataService } from "../../../shared/shared-services/auth-data/auth-data.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
  ExternalAuthDataStorageService
} from "../../../shared/shared-services/external-auth-data-storage/external-auth-data-storage.service";
import { ToastrService } from "ngx-toastr";
import { EnvironmentService } from "../../../shared/shared-services/environment/environment.service";
import * as AuthActions from "./auth.actions";
import * as AuthSelectors from "./auth.selectors";
import { catchError, EMPTY, map, of, switchMap, tap, withLatestFrom } from "rxjs";
import { AuthHttpService } from "../services/auth-http.service";
import { RegisterUserDto } from "../models/dtos/register-user-dto";
import { ExternalAuthService } from "../models/external-auth-service";
import { buildPathToExternalAuthHandler } from "../models/external-auth-handling";
import { LoginUserDto } from "../models/dtos/login-user-dto";
import { DeviceDataStorageService } from "../../../shared/shared-services/device/device-data-storage.service";

@Injectable()
export class AuthEffects {
  registerUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerUser),
      withLatestFrom(this.store.select(AuthSelectors.getRegisterForm), ({ deviceId }, registerForm) => ({ registerForm, deviceId })),
      map(({ registerForm, deviceId }): RegisterUserDto => ({
        firstName: registerForm.value.firstName,
        lastName: registerForm.value.lastName,
        email: registerForm.value.email,
        // Passwords for creating an account in the app
        password: registerForm.value.password,
        confirmPassword: registerForm.value.confirmPassword,
        // Fill DTO with external auth service data in case of external authentication
        externalAuthService: this.externalAuthDataStorageService.getExternalAuthService(),
        externalAuthServiceAccessToken: this.externalAuthDataStorageService.getExternalAuthServiceAccessToken(),
        deviceId
      })),
      switchMap(registerUserDto =>
        this.authHttpService.registerUser(registerUserDto).pipe(
          map(authData => AuthActions.registerUserSuccess({ authData })),
          catchError(error => of(AuthActions.registerUserFail({ error })))
        )
      )
    )
  );

  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginUser),
      withLatestFrom(this.store.select(AuthSelectors.getLoginForm), ({ deviceId }, loginForm) => ({ deviceId, loginForm })),
      map(({ loginForm, deviceId }): LoginUserDto => ({
        email: loginForm.value.email,
        password: loginForm.value.password,
        deviceId
      })),
      switchMap(loginUserDto => {
        return this.authHttpService.loginUser(loginUserDto).pipe(
          map(authData => AuthActions.loginUserSuccess({ authData })),
          catchError(error => of(AuthActions.loginUserFail({ error })))
        );
      })
    )
  );

  loginUserViaExternalAuthService$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginUserViaExternalAuthService),
      switchMap(({ loginUserViaExternalAuthServiceDto }) =>
        this.authHttpService.loginUserViaExternalAuthService(loginUserViaExternalAuthServiceDto).pipe(
          map(authData => AuthActions.loginUserViaExternalAuthServiceSuccess({ authData })),
          catchError(error => of(AuthActions.loginUserViaExternalAuthServiceFail({ error })))
        )
      )
    )
  );

  authenticationSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerUserSuccess, AuthActions.loginUserSuccess, AuthActions.loginUserViaExternalAuthServiceSuccess),
      tap(({ authData }) => {
        this.deviceDataStorageService.setDeviceId(authData.deviceId);
        this.authDataService.setAuthDataToStorage({
          accessToken: authData.accessToken,
          accessTokenExpiresAt: authData.accessTokenExpiresAt,
          refreshToken: authData.refreshToken,
          refreshTokenExpiresAt: authData.refreshTokenExpiresAt
        });
        this.router.navigate(['/']);
      })
    ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        this.authDataService.clearAuthDataFromStorage();
        this.router.navigate(['/']);
      })
    ),
    { dispatch: false }
  );

  getExternalAuthServiceUserInfoForRegisterForm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.getExternalAuthServiceUserInfoForRegisterForm),
      switchMap(({ getExternalAuthServiceUserInfoParams }) =>
        this.authHttpService.getExternalAuthServiceUserInfo(getExternalAuthServiceUserInfoParams).pipe(
          map(externalAuthServiceUserInfo => AuthActions.getExternalAuthServiceUserInfoForRegisterFormSuccess({ externalAuthServiceUserInfo })),
          catchError(error => of(AuthActions.getExternalAuthServiceUserInfoForRegisterFormFail({ error })))
        )
      )
    )
  );

  authenticateViaExternalAuthService$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.authenticateViaExternalAuthService),
      tap(({ externalAuthAim, externalAuthService }) => {
        this.externalAuthDataStorageService.setExternalAuthAim(externalAuthAim);
        this.externalAuthDataStorageService.setExternalAuthService(externalAuthService);
        const environmentVariables = this.environmentService.getEnvironmentVariables();
        const redirectUrl = buildPathToExternalAuthHandler(environmentVariables.APP_URL);

        switch (externalAuthService) {
          case ExternalAuthService.Facebook:
            location.href = environmentVariables.externalAuthServices.facebook.getAuthenticationUrl(redirectUrl);
            return;
          case ExternalAuthService.Google:
            location.href = environmentVariables.externalAuthServices.google.getAuthenticationUrl(redirectUrl);
            return;
        }
      })
    ),
    { dispatch: false }
  );

  handleError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        AuthActions.registerUserFail,
        AuthActions.loginUserFail,
        AuthActions.loginUserViaExternalAuthServiceFail,
        AuthActions.getExternalAuthServiceUserInfoForRegisterFormFail),
      tap(({ error }) => this.showError(error.message))
    ),
    { dispatch: false }
  );

  private showError(message: string) {
    this.toastr.error(message, 'Error' );
  }

  constructor(
    private actions$: Actions,
    private store: Store,
    private router: Router,
    private authHttpService: AuthHttpService,
    private authDataService: AuthDataService,
    private deviceDataStorageService: DeviceDataStorageService,
    private externalAuthDataStorageService: ExternalAuthDataStorageService,
    private toastr: ToastrService,
    private environmentService: EnvironmentService
  ) {}
}
