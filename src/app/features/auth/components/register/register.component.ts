import { Component } from "@angular/core";
import { AuthFacade } from "../../+state/auth.facade";
import { Observable } from "rxjs";
import { FormGroupState } from "ngrx-forms";
import { RegisterForm } from "../../models/register-form";
import { ExternalAuthAim } from "../../models/external-auth-aim";
import { ExternalAuthService } from "../../models/external-auth-service";

@Component({
  selector: 'app-register',
  styleUrls: ['./register.component.scss'],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  registerForm$: Observable<FormGroupState<RegisterForm>>;

  ExternalAuthService = ExternalAuthService;

  constructor(private authFacade: AuthFacade) {
    this.registerForm$ = authFacade.registerForm$;
  }

  handleFormSubmission() {
    this.authFacade.registerUser();
  }

  handleUserExternalAuthentication(externalAuthService: ExternalAuthService) {
    this.authFacade.authenticateViaExternalAuthService(ExternalAuthAim.Register, externalAuthService);
  }
}
