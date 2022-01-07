import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AuthState } from "./auth.reducer";
import * as AuthActions from './auth.actions';
import * as AuthSelectors from './auth.selectors';
import { GetExternalAuthServiceUserInfoParams } from "../models/external-auth-service-user-info";
import { DeviceStorageService } from "../../../shared/shared-services/device/device-storage.service";
import { ToastrService } from "ngx-toastr";
import { ExternalAuthService } from "../models/external-auth-service";
import { ExternalAuthAim } from "../models/external-auth-aim";

@Injectable()
export class AuthFacade {
  registerForm$ = this.store.select(AuthSelectors.getRegisterForm);
  loginForm$ = this.store.select(AuthSelectors.getLoginForm);

  constructor(
    private store: Store<AuthState>,
    private deviceStorageService: DeviceStorageService,
    private toastr: ToastrService
  ) {}

  registerUser() {
    try {
      const deviceId = this.extractDeviceId();
      this.store.dispatch(AuthActions.registerUser({ deviceId }));
    }
    catch (ex: any) {
      this.toastr.show(ex.message);
    }
  }

  loginUser() {
    try {
      const deviceId = this.extractDeviceId();
      this.store.dispatch(AuthActions.loginUser({ deviceId }));
    }
    catch (ex: any) {
      this.toastr.show(ex.message);
    }
  }

  loginUserViaExternalAuthService(externalAuthService: ExternalAuthService, externalAuthServiceAccessToken: string) {
    try {
      const deviceId = this.extractDeviceId();

      this.store.dispatch(AuthActions.loginUserViaExternalAuthService({
        loginUserViaExternalAuthServiceDto: {
          externalAuthService,
          externalAuthServiceAccessToken,
          deviceId
        }
      }));
    }
    catch (ex: any) {
      this.toastr.show(ex.message);
    }
  }

  authenticateViaExternalAuthService(externalAuthAim: ExternalAuthAim, externalAuthService: ExternalAuthService) {
    this.store.dispatch(AuthActions.authenticateViaExternalAuthService({ externalAuthAim, externalAuthService }));
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

  private extractDeviceId() {
    const deviceId = this.deviceStorageService.getDeviceId();

    if (!deviceId) {
      throw new Error('Reload the page and log in again');
    }

    return deviceId;
  }
}
