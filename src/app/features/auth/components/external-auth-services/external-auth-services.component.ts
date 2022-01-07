import { Component, EventEmitter, Output } from "@angular/core";
import { ExternalAuthService } from "../../models/external-auth-service";

@Component({
  selector: 'app-external-auth-services',
  styleUrls: ['./external-auth-services.component.scss'],
  templateUrl: './external-auth-services.component.html'
})
export class ExternalAuthServicesComponent {
  ExternalAuthService = ExternalAuthService;

  @Output() externalAuthServiceClick = new EventEmitter<ExternalAuthService>();

  onExternalAuthServiceClick(externalAuthService: ExternalAuthService) {
    this.externalAuthServiceClick.emit(externalAuthService);
  }
}
