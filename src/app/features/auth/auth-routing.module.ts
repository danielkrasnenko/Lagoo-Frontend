import { Route, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { AuthLayoutComponent } from "./components/auth-layout/auth-layout.component";

const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule]
})
export class AuthRoutingModule {}
