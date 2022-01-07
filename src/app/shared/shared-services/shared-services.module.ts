import { NgModule } from "@angular/core";
import { EnvironmentService } from "./environment/environment.service";
import { LocalStorageService } from "./local-storage/local-storage.service";
import { AuthDataService } from "./auth-data/auth-data.service";
import { ExternalAuthDataStorageService } from "./external-auth-data-storage/external-auth-data-storage.service";
import { DeviceStorageService } from "./device/device-storage.service";

@NgModule({
  providers: [
    EnvironmentService,
    LocalStorageService,
    AuthDataService,
    ExternalAuthDataStorageService,
    DeviceStorageService
  ]
})
export class SharedServicesModule {}
