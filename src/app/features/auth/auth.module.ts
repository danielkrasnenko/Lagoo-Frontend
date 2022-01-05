import { NgModule } from "@angular/core";
import { AuthHttpService } from "./services/auth-http.service";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [CommonModule],
  providers: [AuthHttpService]
})
export class AuthModule {}
