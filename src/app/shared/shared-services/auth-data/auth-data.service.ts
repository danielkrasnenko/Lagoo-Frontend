import { Injectable } from "@angular/core";
import { LocalStorageService } from "../local-storage/local-storage.service";
import { AuthData } from "./models/auth-data";
import { LocalStorageKeys } from "../local-storage/models/local-storage-keys";
import { AccessTokenData } from "./models/access-token-data";

@Injectable()
export class AuthDataService {
  constructor(private localStorageService: LocalStorageService) {}

  getAuthDataFromStorage() {
    return this.localStorageService.getItem<AuthData>(LocalStorageKeys.AuthData);
  }

  setAuthDataToStorage(authData: AuthData) {
    this.localStorageService.setItem(LocalStorageKeys.AuthData, authData);
  }

  clearAuthDataFromStorage() {
    this.localStorageService.clear();
  }

  getAccessToken() {
    return this.getAuthDataFromStorage()?.accessToken;
  }

  getRefreshToken() {
    return this.getAuthDataFromStorage()?.refreshToken;
  }

  updateAccessToken(accessTokenData: AccessTokenData) {
    const authData = this.getAuthDataFromStorage();

    if (authData) {
      authData.accessToken = accessTokenData.accessToken;
      authData.accessTokenExpiresAt = accessTokenData.accessTokenExpiresAt;

      this.setAuthDataToStorage(authData);
    }
  }

  accessTokenIsValid(authData?: AuthData) {
    if (!authData) {
      try {
        authData = this.extractAuthData();
      }
      catch (e) {
        return false;
      }
    }

    return !!authData.accessToken && +new Date(authData.accessTokenExpiresAt) - Date.now() > 0;
  }

  refreshTokenIsValid(authData?: AuthData) {
    if (!authData) {
      try {
        authData = this.extractAuthData();
      }
      catch (e) {
        return false;
      }
    }

    return !!authData.refreshToken && +new Date(authData.refreshTokenExpiresAt) - Date.now() > 0;
  }

  private extractAuthData() {
    const authDataFromStorage = this.getAuthDataFromStorage();

    if (!authDataFromStorage) {
      throw new Error('Authentication data does not exist');
    }

    return authDataFromStorage;
  }
}
