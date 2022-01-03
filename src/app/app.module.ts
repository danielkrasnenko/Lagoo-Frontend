import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonComponentsModule } from "./common-components/common-components.module";
import { SharedComponentsModule } from "./shared/shared-components/shared-components.module";
import { SharedServicesModule } from "./shared/shared-services/shared-services-module";
import { SharedUtilsModule } from "./shared/shared-utils/shared-utils.module";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { ToastrModule } from "ngx-toastr";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonComponentsModule,
    SharedComponentsModule,
    SharedServicesModule,
    SharedUtilsModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-full-width',
      timeOut: 4000,
      progressBar: true,
      maxOpened: 5,
      autoDismiss: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
