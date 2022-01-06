import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { extractAccessTokenFromUrlWithQueryString } from "@app/utils";
import { ToastrService } from "ngx-toastr";
import {
  ExternalAuthDataStorageService
} from "../../../../shared/shared-services/external-auth-data-storage/external-auth-data-storage.service";
import { ExternalAuthService } from "../../models/external-auth-service";
import { ExternalAuthAim } from "../../models/external-auth-aim";

@Component({
  selector: 'app-external-auth',
  template: '<div>Processing...</div>'
})
export class ExternalAuthComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private toastr: ToastrService, private router: Router, private externalAuthDataStorage: ExternalAuthDataStorageService) {}

  ngOnInit() {
    const accessToken = this.activatedRoute.snapshot.fragment && extractAccessTokenFromUrlWithQueryString(this.activatedRoute.snapshot.fragment);
    if (!accessToken) {
      return this.quit('Could not get data from external authentication service');
    }

    this.externalAuthDataStorage.setExternalAuthServiceAccessToken(accessToken);
    const externalAuthService = this.externalAuthDataStorage.getExternalAuthService();
    const externalAuthAim = this.externalAuthDataStorage.getExternalAuthAim();

    if (!externalAuthService || !externalAuthAim) {
      return this.quit('Could not extract data about external authentication');
    }

    // TODO Dispatch an action (login || get-info) which will do some extra things (redirection, filling the form, etc...)
    this.takeActionAccordingToExternalAuthAim(externalAuthAim, externalAuthService, accessToken);
  }

  private takeActionAccordingToExternalAuthAim(externalAuthAim: ExternalAuthAim, externalAuthService: ExternalAuthService, accessToken: string) {
    switch (externalAuthAim) {
      case ExternalAuthAim.Login:
        return;
      case ExternalAuthAim.Register:
        return;
    }
  }

  private quit(message: string) {
    this.toastr.show(message);
    this.router.navigate(['/']);
    return;
  }
}
