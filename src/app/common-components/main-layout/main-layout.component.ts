import { Component } from "@angular/core";
import { AuthFacade } from "../../features/auth/+state/auth.facade";

@Component({
  selector: 'app-main-layout',
  styleUrls: ['./main-layout.component.scss'],
  templateUrl: './main-layout.component.html'
})
export class MainLayoutComponent {
  constructor(private authFacade: AuthFacade) {}

  handleLogout() {
    this.authFacade.logout();
  }
}
