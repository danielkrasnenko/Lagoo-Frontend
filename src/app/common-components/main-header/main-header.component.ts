import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: 'app-main-header',
  styleUrls: ['./main-header.component.scss'],
  templateUrl: './main-header.component.html'
})
export class MainHeaderComponent {
  user = 'User';

  @Output() logout = new EventEmitter();

  onLogout() {
    this.logout.emit();
  }
}
