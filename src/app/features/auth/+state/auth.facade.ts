import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AuthState } from "./auth.reducer";
import * as AuthActions from './auth.actions';
import * as AuthSelectors from './auth.selectors';
import { GetExternalAuthServiceUserInfoParams } from "../models/external-auth-service-user-info";
import { DeviceDataStorageService } from "../../../shared/shared-services/device/device-data-storage.service";
import { ExternalAuthService } from "../models/external-auth-service";
import { ExternalAuthAim } from "../models/external-auth-aim";

@Injectable()
export class AuthFacade {
  registerForm$ = this.store.select(AuthSelectors.getRegisterForm);
  loginForm$ = this.store.select(AuthSelectors.getLoginForm);

  constructor(
    private store: Store<AuthState>,
    private deviceDataStorageService: DeviceDataStorageService
  ) {}

  registerUser() {
    this.store.dispatch(AuthActions.registerUser({ deviceId: this.deviceDataStorageService.getDeviceId() }));
  }

  loginUser() {
    this.store.dispatch(AuthActions.loginUser({ deviceId: this.deviceDataStorageService.getDeviceId() }));
  }

  loginUserViaExternalAuthService(externalAuthService: ExternalAuthService, externalAuthServiceAccessToken: string) {
    this.store.dispatch(AuthActions.loginUserViaExternalAuthService({
      loginUserViaExternalAuthServiceDto: {
        externalAuthService,
        externalAuthServiceAccessToken,
        deviceId: this.deviceDataStorageService.getDeviceId()
      }
    }));
  }

  authenticateViaExternalAuthService(externalAuthAim: ExternalAuthAim, externalAuthService: ExternalAuthService) {
    this.store.dispatch(AuthActions.authenticateViaExternalAuthService({ externalAuthAim, externalAuthService }));
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }

  getExternalAuthServiceUserInfoForRegisterForm(getExternalAuthServiceUserInfoParams: GetExternalAuthServiceUserInfoParams) {
    this.store.dispatch(AuthActions.getExternalAuthServiceUserInfoForRegisterForm({ getExternalAuthServiceUserInfoParams }));
  }

  clearRegisterForm() {
    this.store.dispatch(AuthActions.clearRegisterForm());
  }

  clearLoginForm() {
    this.store.dispatch(AuthActions.clearLoginForm());
  }
}
