import { NgModule } from "@angular/core";
import { AuthHttpService } from "./services/auth-http.service";
import { CommonModule } from "@angular/common";
import { AuthRoutingModule } from "./auth-routing.module";
import { AuthLayoutComponent } from "./components/auth-layout/auth-layout.component";
import { ExternalAuthComponent } from "./components/external-auth/external-auth.component";

@NgModule({
  declarations: [
    AuthLayoutComponent,
    ExternalAuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ],
  providers: [AuthHttpService]
})
export class AuthModule {}
