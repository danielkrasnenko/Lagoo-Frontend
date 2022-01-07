import { Injectable } from "@angular/core";

@Injectable()
export class LocalStorageService {
  setItem(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getItem<TItem>(key: string): TItem | undefined {
    const data = localStorage.getItem(key);
    return data
      ? JSON.parse(data)
      : undefined;
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }
}
