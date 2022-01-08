import { NgModule } from "@angular/core";
import { EnvironmentService } from "./environment/environment.service";
import { LocalStorageService } from "./local-storage/local-storage.service";
import { AuthDataService } from "./auth-data/auth-data.service";
import { ExternalAuthDataStorageService } from "./external-auth-data-storage/external-auth-data-storage.service";
import { DeviceDataStorageService } from "./device/device-data-storage.service";

@NgModule({
  providers: [
    EnvironmentService,
    LocalStorageService,
    AuthDataService,
    ExternalAuthDataStorageService,
    DeviceDataStorageService
  ]
})
export class SharedServicesModule {}
