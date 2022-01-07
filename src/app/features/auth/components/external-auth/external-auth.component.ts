import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { extractAccessTokenFromUrlWithQueryString } from "@app/utils";
import { ToastrService } from "ngx-toastr";
import {
  ExternalAuthDataStorageService
} from "../../../../shared/shared-services/external-auth-data-storage/external-auth-data-storage.service";
import { ExternalAuthService } from "../../models/external-auth-service";
import { ExternalAuthAim } from "../../models/external-auth-aim";
import { AuthFacade } from "../../+state/auth.facade";
import { AuthDataService } from "../../../../shared/shared-services/auth-data/auth-data.service";

@Component({
  selector: 'app-external-auth',
  template: `
    <div class="flex-center-middle">
      <mat-spinner [diameter]="60"></mat-spinner>
    </div>
  `
})
export class ExternalAuthComponent implements OnInit {
  constructor(
      private activatedRoute: ActivatedRoute,
      private toastr: ToastrService,
      private router: Router,
      private externalAuthDataStorage: ExternalAuthDataStorageService,
      private authDataService: AuthDataService,
      private authFacade: AuthFacade
  ) {}

  ngOnInit() {
    const externalAuthServiceAccessToken = this.activatedRoute.snapshot.fragment && extractAccessTokenFromUrlWithQueryString(this.activatedRoute.snapshot.fragment);
    if (!externalAuthServiceAccessToken) {
      return this.quit('Could not get data from external authentication service');
    }

    this.externalAuthDataStorage.setExternalAuthServiceAccessToken(externalAuthServiceAccessToken);
    const externalAuthService = this.externalAuthDataStorage.getExternalAuthService();
    const externalAuthAim = this.externalAuthDataStorage.getExternalAuthAim();

    if (!externalAuthService || !externalAuthAim) {
      return this.quit('Could not extract data about external authentication');
    }

    this.takeActionAccordingToExternalAuthAim(externalAuthAim, externalAuthService, externalAuthServiceAccessToken);
  }

  private takeActionAccordingToExternalAuthAim(externalAuthAim: ExternalAuthAim, externalAuthService: ExternalAuthService, externalAuthServiceAccessToken: string) {
    switch (externalAuthAim) {
      case ExternalAuthAim.Login:
        this.authFacade.loginUserViaExternalAuthService(externalAuthService, externalAuthServiceAccessToken);
        return;
      case ExternalAuthAim.Register:
        this.authFacade.getExternalAuthServiceUserInfoForRegisterForm({ externalAuthService, externalAuthServiceAccessToken });
        return;
    }
  }

  private quit(message: string) {
    this.toastr.error(message);
    this.router.navigate(['/']);
    return;
  }
}
