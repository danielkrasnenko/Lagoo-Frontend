import { Injectable } from "@angular/core";
import { LocalStorageService } from "../local-storage/local-storage.service";
import { LocalStorageKeys } from "../local-storage/models/local-storage-keys";

@Injectable()
export class DeviceStorageService {
  constructor(private localStorageService: LocalStorageService) {}

  getDeviceId() {
    return this.localStorageService.getItem<string>(LocalStorageKeys.DeviceId);
  }

  setDeviceId(deviceId: string) {
    this.localStorageService.setItem(LocalStorageKeys.DeviceId, deviceId);
  }

  clearDeviceId() {
    this.localStorageService.removeItem(LocalStorageKeys.DeviceId);
  }
}
