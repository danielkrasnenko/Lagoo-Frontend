import { Route, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { EXTERNAL_AUTHENTICATION_HANDLER_ROUTE } from "./models/external-auth-handling";
import { ExternalAuthComponent } from "./components/external-auth/external-auth.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";

const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: EXTERNAL_AUTHENTICATION_HANDLER_ROUTE,
    component: ExternalAuthComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class AuthRoutingModule {}
