import { NgModule } from "@angular/core";
import { NotFoundComponent } from "./not-found/not-found.component";
import { MainHeaderComponent } from "./main-header/main-header.component";
import { MainFooterComponent } from "./main-footer/main-footer.component";
import { MainLayoutComponent } from "./main-layout/main-layout.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    NotFoundComponent,
    MainHeaderComponent,
    MainFooterComponent,
    MainLayoutComponent
  ],
  exports: [
    NotFoundComponent,
    MainLayoutComponent
  ]
})
export class CommonComponentsModule {}
