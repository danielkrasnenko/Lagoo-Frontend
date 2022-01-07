import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AUTH_FEATURE_KEY, AuthState } from "./auth.reducer";

export const getAuthState = createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

export const getRegisterForm = createSelector(getAuthState, state => state.registerForm);

export const getLoginForm = createSelector(getAuthState, state => state.loginForm);
