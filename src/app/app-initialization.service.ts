import { Injectable } from "@angular/core";
import { DeviceStorageService } from "./shared/shared-services/device/device-storage.service";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs";

@Injectable()
export class AppInitializationService {
  constructor(private http: HttpClient , private deviceStorageService: DeviceStorageService) {}

  initialize() {
    if (!!this.deviceStorageService.getDeviceId()) {
      return;
    }

    this.http.get<{ deviceId: string }>('/api/devices/id').pipe(tap(
      res => this.deviceStorageService.setDeviceId(res.deviceId),
        error => console.error(`Could not load initialization data. ${error.message}`)
    ));
  }
}
