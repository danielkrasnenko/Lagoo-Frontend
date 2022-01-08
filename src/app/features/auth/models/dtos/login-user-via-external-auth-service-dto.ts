import { ExternalAuthService } from "../external-auth-service";

export interface LoginUserViaExternalAuthServiceDto {
  externalAuthService: ExternalAuthService;
  externalAuthServiceAccessToken: string;
  deviceId?: string;
}
