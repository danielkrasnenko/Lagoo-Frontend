import { Injectable } from "@angular/core";
import { LocalStorageService } from "../local-storage/local-storage.service";
import { ExternalAuthService } from "../../../features/auth/models/external-auth-service";
import { LocalStorageKeys } from "../local-storage/models/local-storage-keys";
import { ExternalAuthAim } from "../../../features/auth/models/external-auth-aim";

@Injectable()
export class ExternalAuthDataStorageService {
  constructor(private localStorageService: LocalStorageService) {}

  getExternalAuthService() {
    return this.localStorageService.getItem<ExternalAuthService>(LocalStorageKeys.ExternalAuthService);
  }

  setExternalAuthService(externalAuthService: ExternalAuthService) {
    return this.localStorageService.setItem(LocalStorageKeys.ExternalAuthService, externalAuthService);
  }

  clearExternalAuthService() {
    this.localStorageService.removeItem(LocalStorageKeys.ExternalAuthService);
  }

  getExternalAuthServiceAccessToken() {
    return this.localStorageService.getItem<string>(LocalStorageKeys.ExternalAuthServiceAccessToken);
  }

  setExternalAuthServiceAccessToken(accessToken: string) {
    return this.localStorageService.setItem(LocalStorageKeys.ExternalAuthServiceAccessToken, accessToken);
  }

  clearExternalAuthServiceAccessToken() {
    this.localStorageService.removeItem(LocalStorageKeys.ExternalAuthServiceAccessToken);
  }

  getExternalAuthAim() {
    return this.localStorageService.getItem<ExternalAuthAim>(LocalStorageKeys.ExternalAuthAim);
  }

  setExternalAuthAim(aim: ExternalAuthAim) {
    this.localStorageService.setItem(LocalStorageKeys.ExternalAuthAim, aim);
  }

  clearExternalAuthAim() {
    this.localStorageService.removeItem(LocalStorageKeys.ExternalAuthAim);
  }

  clearExternalAuthData() {
    this.clearExternalAuthService();
    this.clearExternalAuthServiceAccessToken();
    this.clearExternalAuthAim();
  }

  externalAuthServiceAndItsAccessTokenExist() {
    return !!this.getExternalAuthService() && !!this.getExternalAuthServiceAccessToken();
  }
}
