import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: 'app-auth-layout',
  styleUrls: ['auth-layout.component.scss'],
  templateUrl: 'auth-layout.component.html'
})
export class AuthLayoutComponent {
  constructor(public router: Router) {}
}
