import { createAction, props } from "@ngrx/store";
import { AuthData } from "../../../shared/shared-services/auth-data/models/auth-data";
import { HttpErrorResponse } from "@angular/common/http";
import { LoginUserViaExternalAuthServiceDto } from "../models/dtos/login-user-via-external-auth-service-dto";
import {
  ExternalAuthServiceUserInfo,
  GetExternalAuthServiceUserInfoParams
} from "../models/external-auth-service-user-info";
import { ExternalAuthAim } from "../models/external-auth-aim";
import { ExternalAuthService } from "../models/external-auth-service";

export const registerUser = createAction('[AUTH] Register User', props<{ deviceId: string }>());

export const registerUserSuccess = createAction('[AUTH] Register User Success', props<{ authData: AuthData }>());

export const registerUserFail = createAction('[AUTH] Register User Fail', props<{ error: HttpErrorResponse }>());

export const loginUser = createAction('[AUTH] Login User', props<{ deviceId: string }>());

export const loginUserSuccess = createAction('[AUTH] Login User Success', props<{ authData: AuthData }>());

export const loginUserFail = createAction('[AUTH] Login User Fail', props<{ error: HttpErrorResponse }>());

export const loginUserViaExternalAuthService = createAction('[AUTH] Login User via External Auth Service', props<{ loginUserViaExternalAuthServiceDto: LoginUserViaExternalAuthServiceDto }>());

export const loginUserViaExternalAuthServiceSuccess = createAction('[AUTH] Login User via External Auth Service Success', props<{ authData: AuthData }>());

export const loginUserViaExternalAuthServiceFail = createAction('[AUTH] Login User via External Auth Service Fail', props<{ error: HttpErrorResponse }>());

export const authenticateViaExternalAuthService = createAction('[AUTH] Authenticate via External Auth Service', props<{ externalAuthAim: ExternalAuthAim; externalAuthService: ExternalAuthService }>());

export const getExternalAuthServiceUserInfoForRegisterForm = createAction('[AUTH] Get External Auth Service User Info for Register Form', props<{ getExternalAuthServiceUserInfoParams: GetExternalAuthServiceUserInfoParams }>());

export const getExternalAuthServiceUserInfoForRegisterFormSuccess = createAction('[AUTH] Get External Auth Service User Info for Register Form Success', props<{ externalAuthServiceUserInfo: ExternalAuthServiceUserInfo }>());

export const getExternalAuthServiceUserInfoForRegisterFormFail = createAction('[AUTH] Get External Auth Service User Info for Register Form Fail', props<{ error: HttpErrorResponse }>());

export const clearRegisterForm = createAction('[AUTH] Clear Register Form');

export const clearLoginForm = createAction('[AUTH] Clear Login Form');
