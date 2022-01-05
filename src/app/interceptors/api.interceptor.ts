import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { EnvironmentService } from "../shared/shared-services/environment/environment.service";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(private environmentService: EnvironmentService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({ url: `${this.getBackendUrl()}/${req.url}` });
    return next.handle(req);
  }

  private getBackendUrl(): string {
    return this.environmentService.getEnvironmentVariables().API_URL;
  }

}
