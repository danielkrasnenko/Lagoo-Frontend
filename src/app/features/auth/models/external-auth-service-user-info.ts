import { ExternalAuthService } from "./external-auth-service";

export interface ExternalAuthServiceUserInfo {
  firstName: string;
  lastName: string;
  email: string;
}

export interface ExternalAuthServiceUserInfoDto {
  firstName: string;
  lastName: string;
  email: string;
}

export interface GetExternalAuthServiceUserInfoParams {
  externalAuthService: ExternalAuthService;
  externalAuthServiceAccessToken: string;
}
