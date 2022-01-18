import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EventsRoutingModule } from "./events-routing.module";
import { EffectsModule } from "@ngrx/effects";
import { EventsEffects } from "./+state/events.effects";
import { StoreModule } from "@ngrx/store";
import * as EventsStateData from './+state/events.reducer'
import { EventsHttpService } from "./services/events-http.service";
import { EventsFacade } from "./+state/events.facade";
import { EventsComponent } from "./components/events/events.component";
import { EventDetailsComponent } from "./components/event-details/event-details.component";
import { EventFormDialogComponent } from "./components/event-form-dialog/event-form-dialog.component";
import { NgrxFormsModule } from "ngrx-forms";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSliderModule } from "@angular/material/slider";
import { MatTableModule } from "@angular/material/table";
import { MatDialogModule } from "@angular/material/dialog";
import { EventsSignalRService } from "./services/events-signal-r.service";

@NgModule({
  declarations: [
    EventsComponent,
    EventDetailsComponent,
    EventFormDialogComponent
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    StoreModule.forFeature(EventsStateData.EVENTS_FEATURE_KEY, EventsStateData.reducer),
    EffectsModule.forFeature([EventsEffects]),
    MatDialogModule,
    FormsModule,
    NgrxFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSliderModule,
    MatTableModule,
  ],
  providers: [EventsHttpService, EventsFacade, EventsSignalRService]
})
export class EventsModule {}
