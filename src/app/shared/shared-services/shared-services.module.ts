import {NgModule} from "@angular/core";
import { EnvironmentService } from "./environment/environment.service";
import { LocalStorageService } from "./local-storage/local-storage.service";
import { AuthDataService } from "./auth-data-storage/auth-data.service";

@NgModule({
  providers: [
    EnvironmentService,
    LocalStorageService,
    AuthDataService
  ]
})
export class SharedServicesModule {}
