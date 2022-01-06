import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AccessTokenData } from "../../../shared/shared-services/auth-data/models/access-token-data";
import {
  ExternalAuthServiceUserInfo, ExternalAuthServiceUserInfoDto,
  GetExternalAuthServiceUserInfoDto
} from "../models/external-auth-service-user-info";
import { Observable } from "rxjs";
import { AccessTokenDataDto } from "../models/dtos/access-token-data-dto";
import { RegisterUserDto } from "../models/dtos/register-user-dto";
import { AuthData } from "../../../shared/shared-services/auth-data/models/auth-data";
import { AuthDataDto } from "../models/dtos/auth-data-dto";
import { LoginUserDto } from "../models/dtos/login-user-dto";
import { LoginUserViaExternalAuthServiceDto } from "../models/dtos/login-user-via-external-auth-service-dto";
import { RefreshAccessTokenDto } from "../models/dtos/refresh-access-token-dto";

@Injectable()
export class AuthHttpService {
  private apiEndpoint = 'api/account/auth';

  constructor(private http: HttpClient) {}

  registerUser(registerUserDto: RegisterUserDto): Observable<AuthData> {
    return this.http.post<AuthDataDto>(`${this.apiEndpoint}/register`, registerUserDto);
  }

  loginUser(loginUserDto: LoginUserDto): Observable<AuthData> {
    return this.http.post<AuthDataDto>(`${this.apiEndpoint}/login`, loginUserDto);
  }

  loginUserViaExternalAuthService(loginUserViaExternalAuthServiceDto: LoginUserViaExternalAuthServiceDto): Observable<AuthData> {
    return this.http.post<AuthDataDto>(`${this.apiEndpoint}/external-service/login`, loginUserViaExternalAuthServiceDto);
  }

  refreshAccessToken(refreshAccessTokenDto: RefreshAccessTokenDto): Observable<AccessTokenData> {
    return this.http.post<AccessTokenDataDto>(`${this.apiEndpoint}/refresh`, { refreshAccessTokenDto });
  }

  getExternalAuthServiceUserInfo(getExternalAuthServiceUserInfoDto: GetExternalAuthServiceUserInfoDto): Observable<ExternalAuthServiceUserInfo> {
    return this.http.post<ExternalAuthServiceUserInfoDto>(`${this.apiEndpoint}/external-service/user-info`, getExternalAuthServiceUserInfoDto);
  }
}
