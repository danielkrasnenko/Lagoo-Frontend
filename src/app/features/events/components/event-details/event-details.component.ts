import { Component, OnDestroy, OnInit } from "@angular/core";
import { EventsFacade } from "../../+state/events.facade";
import { filter, map, Observable, tap } from "rxjs";
import { Event, UpdateEventDto } from "../../models/event";
import { ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { EventFormDialogComponent } from "../event-form-dialog/event-form-dialog.component";
import { EventForm } from "../../models/event-form";
import { EventFormDialogData } from "../../models/event-form-dialog-data";
import { unbox } from "ngrx-forms";
import { eventTypeToLabelMap } from "../../models/event-type";
import { EventsSignalRService } from "../../services/events-signal-r.service";

@Component({
  selector: 'app-event-details',
  styleUrls: ['event-details.component.scss'],
  templateUrl: 'event-details.component.html'
})
export class EventDetailsComponent implements OnInit, OnDestroy {
  event$: Observable<Event | undefined>;

  eventTypeToLabelMap = eventTypeToLabelMap;

  constructor(
    private eventsFacade: EventsFacade,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private eventsSignalRService: EventsSignalRService
  ) {
    this.event$ = eventsFacade.selectedEvent$;
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.eventsFacade.loadSelectedEvent(+id);
    }

    this.eventsSignalRService.addSelectedEventListeners();
  }

  ngOnDestroy() {
    this.eventsSignalRService.removeListeners();
    this.eventsFacade.clearSelectedEvent();
  }

  handleOpenEditEventDialog(event: Event) {
    const dialogData: EventFormDialogData = {
      event
    };

    this.dialog
      .open(EventFormDialogComponent, { data: dialogData,  width: '800px' })
      .afterClosed()
      .pipe(
        filter(Boolean),
        map((form: EventForm): UpdateEventDto => ({
          name: form.name,
          type: unbox(form.type),
          address: form.address,
          comment: form.comment,
          isPrivate: form.isPrivate,
          duration: form.duration,
          beginsAt: new Date(form.beginsAt).toJSON()
        })),
        tap((updateEventDto) => this.eventsFacade.updateEvent(event.id, updateEventDto))
      )
      .subscribe();
  }
}
