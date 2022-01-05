import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AccessTokenData } from "../../../shared/shared-services/auth-data-storage/models/access-token-data";

@Injectable()
export class AuthHttpService {
  constructor(private http: HttpClient) {}

  refreshAccessToken(refreshToken: string) {
    return this.http.post<AccessTokenData>(`/auth/refresh`, { refreshToken });
  }
}
