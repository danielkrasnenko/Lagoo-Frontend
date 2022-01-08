import { Injectable } from "@angular/core";
import { LocalStorageService } from "../local-storage/local-storage.service";
import { StorageAuthData } from "./models/storage-auth-data";
import { LocalStorageKeys } from "../local-storage/models/local-storage-keys";
import { StorageAccessTokenData } from "./models/storage-access-token-data";

@Injectable()
export class AuthDataService {
  constructor(private localStorageService: LocalStorageService) {}

  getAuthDataFromStorage() {
    return this.localStorageService.getItem<StorageAuthData>(LocalStorageKeys.AuthData);
  }

  setAuthDataToStorage(authData: StorageAuthData) {
    this.localStorageService.setItem(LocalStorageKeys.AuthData, authData);
  }

  clearAuthDataFromStorage() {
    this.localStorageService.removeItem(LocalStorageKeys.AuthData);
  }

  getAccessToken() {
    return this.getAuthDataFromStorage()?.accessToken;
  }

  getRefreshTokenValue() {
    return this.getAuthDataFromStorage()?.refreshTokenValue;
  }

  updateAccessTokenDataInStorage(accessTokenData: StorageAccessTokenData) {
    const authData = this.getAuthDataFromStorage();

    if (authData) {
      authData.accessToken = accessTokenData.accessToken;
      authData.accessTokenExpiresAt = accessTokenData.accessTokenExpiresAt;

      this.setAuthDataToStorage(authData);
    }
  }

  accessTokenIsValid(authData?: StorageAuthData) {
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

  refreshTokenIsValid(authData?: StorageAuthData) {
    if (!authData) {
      try {
        authData = this.extractAuthData();
      }
      catch (e) {
        return false;
      }
    }

    return !!authData.refreshTokenValue && +new Date(authData.refreshTokenExpiresAt) - Date.now() > 0;
  }

  private extractAuthData() {
    const authDataFromStorage = this.getAuthDataFromStorage();

    if (!authDataFromStorage) {
      throw new Error('Authentication data does not exist');
    }

    return authDataFromStorage;
  }
}
