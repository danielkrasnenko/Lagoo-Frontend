import { ExternalAuthService } from "../external-auth-service";

export interface RegisterUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  externalAuthService?: ExternalAuthService;
  externalAuthServiceAccessToken?: string;
}
