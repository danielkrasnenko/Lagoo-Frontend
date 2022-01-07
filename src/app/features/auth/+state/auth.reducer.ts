import { createFormGroupState, FormGroupState, onNgrxForms, setValue, updateGroup } from "ngrx-forms";
import { REGISTER_FORM_ID, RegisterForm } from "../models/register-form";
import { LOGIN_FORM_ID, LoginForm } from "../models/login-form";
import { createReducer, on } from "@ngrx/store";
import * as AuthActions from './auth.actions';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
  registerForm: FormGroupState<RegisterForm>;
  loginForm: FormGroupState<LoginForm>;
}

const registerFormInitialState = createFormGroupState<RegisterForm>(REGISTER_FORM_ID, {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
});

const loginFormInitialState = createFormGroupState<LoginForm>(LOGIN_FORM_ID, {
  email: '',
  password: ''
});

export const initialState: AuthState = {
  registerForm: registerFormInitialState,
  loginForm: loginFormInitialState
};

export const reducer = createReducer(
  initialState,
  onNgrxForms(),
  on(AuthActions.getExternalAuthServiceUserInfoForRegisterFormSuccess, (state, { externalAuthServiceUserInfo }) => ({
    ...state,
    registerForm: updateGroup(state.registerForm, {
      firstName: setValue(externalAuthServiceUserInfo.firstName),
      lastName: setValue(externalAuthServiceUserInfo.lastName),
      email: setValue(externalAuthServiceUserInfo.email)
    })
  })),
  on(AuthActions.clearRegisterForm, state => ({
    ...state,
    registerForm: registerFormInitialState
  })),
  on(AuthActions.clearLoginForm, state => ({
    ...state,
    loginForm: loginFormInitialState
  }))
);
