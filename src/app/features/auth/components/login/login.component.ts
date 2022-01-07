import { Component } from "@angular/core";
import { AuthFacade } from "../../+state/auth.facade";
import { Observable } from "rxjs";
import { FormGroupState } from "ngrx-forms";
import { LoginForm } from "../../models/login-form";
import { ExternalAuthService } from "../../models/external-auth-service";
import { ExternalAuthAim } from "../../models/external-auth-aim";

@Component({
  selector: 'app-login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginForm$: Observable<FormGroupState<LoginForm>>;

  ExternalAuthService = ExternalAuthService;

  constructor(private authFacade: AuthFacade) {
    this.loginForm$ = authFacade.loginForm$;
  }

  handleFormSubmission() {
    this.authFacade.loginUser();
  }

  handleUserExternalAuthentication(externalAuthService: ExternalAuthService) {
    this.authFacade.authenticateViaExternalAuthService(ExternalAuthAim.Login, externalAuthService);
  }
}
