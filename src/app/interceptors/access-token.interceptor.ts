import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { AuthDataService } from "../shared/shared-services/auth-data/auth-data.service";
import { Router } from "@angular/router";
import { catchError, Observable, switchMap, tap, throwError } from "rxjs";
import { EnvironmentService } from "../shared/shared-services/environment/environment.service";
import { StorageAccessTokenData } from "../shared/shared-services/auth-data/models/storage-access-token-data";
import { AuthHttpService } from "../features/auth/services/auth-http.service";

@Injectable()
export class AccessTokenInterceptor implements HttpInterceptor {

  constructor(
    private authDataService: AuthDataService,
    private router: Router,
    private environmentService: EnvironmentService,
    private authHttpService: AuthHttpService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authData = this.authDataService.getAuthDataFromStorage();

    if (authData) {
      req = this.attachAccessTokenToRequest(req, authData.accessToken);
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          if (authData && this.authDataService.refreshTokenIsValid(authData)) {
            return this.tryRefreshAccessToken(authData.refreshToken, authData.accessToken).pipe(
              switchMap((accessTokenData: StorageAccessTokenData) =>
                next.handle(this.attachAccessTokenToRequest(req, accessTokenData.accessToken)).pipe(
                  catchError(err => {
                    this.logout();
                    throw err;
                  })
                )
              )
            );
          }
          else {
            this.logout();
          }
        }
        return throwError(error);
      })
    );
  }

  private attachAccessTokenToRequest(req: HttpRequest<any>, accessToken: string) {
    return req.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } });
  }

  private tryRefreshAccessToken(refreshToken: string, accessToken: string) {
    return this.authHttpService.refreshAccessToken({ refreshTokenValue: refreshToken, accessToken }).pipe(
      tap(accessTokenData => this.authDataService.updateAccessTokenDataInStorage(accessTokenData))
    );
  }

  private logout() {
    this.authDataService.clearAuthDataFromStorage();
    this.router.navigate(['/auth', 'login']);
  }
}
