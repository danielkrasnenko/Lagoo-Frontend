import { NgModule } from "@angular/core";
import { AuthHttpService } from "./services/auth-http.service";
import { CommonModule } from "@angular/common";
import { AuthRoutingModule } from "./auth-routing.module";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { FormsModule } from "@angular/forms";
import { NgrxFormsModule } from "ngrx-forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import * as AuthStateData from "./+state/auth.reducer";
import { ExternalAuthComponent } from "./components/external-auth/external-auth.component";
import { AuthEffects } from "./+state/auth.effects";
import { AuthFacade } from "./+state/auth.facade";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { ExternalAuthServicesComponent } from "./components/external-auth-services/external-auth-services.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    ExternalAuthComponent,
    RegisterComponent,
    LoginComponent,
    ExternalAuthServicesComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    StoreModule.forFeature(AuthStateData.AUTH_FEATURE_KEY, AuthStateData.reducer),
    EffectsModule.forFeature([AuthEffects]),
    FormsModule,
    NgrxFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  providers: [AuthHttpService, AuthFacade]
})
export class AuthModule {}
