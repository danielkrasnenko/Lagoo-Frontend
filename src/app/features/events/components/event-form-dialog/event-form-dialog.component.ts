import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { EventFormDialogData } from "../../models/event-form-dialog-data";
import { EventsFacade } from "../../+state/events.facade";
import { Observable } from "rxjs";
import { FormGroupState } from "ngrx-forms";
import { EventForm } from "../../models/event-form";
import { eventTypeOptions } from "../../models/event-type";

@Component({
  selector: 'app-event-form-dialog',
  styleUrls: ['./event-form-dialog.component.scss'],
  templateUrl: './event-form-dialog.component.html'
})
export class EventFormDialogComponent implements OnInit, OnDestroy {
  eventForm$: Observable<FormGroupState<EventForm>>;

  eventTypeOptions = eventTypeOptions;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: EventFormDialogData,
    private dialogRef: MatDialogRef<EventFormDialogComponent, EventForm>,
    private eventsFacade: EventsFacade
    ) {
    this.eventForm$ = this.eventsFacade.eventForm$;
  }

  ngOnInit() {
    if (this.data?.event) {
      this.eventsFacade.fillEventFormWithData(this.data.event);
    }
  }

  ngOnDestroy() {
    this.eventsFacade.clearEventForm();
  }

  close() {
    this.dialogRef.close();
  }

  submit(eventForm: EventForm) {
    this.dialogRef.close(eventForm)
  }
}
