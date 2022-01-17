import { Component, OnDestroy, OnInit } from "@angular/core";
import { EventsFacade } from "../../+state/events.facade";
import { filter, map, Observable, tap } from "rxjs";
import { TableEvent } from "../../models/table-event";
import { GetEventsParams } from "../../models/get-events-params";
import { Router } from "@angular/router";
import { EventForm } from "../../models/event-form";
import { MatDialog } from "@angular/material/dialog";
import { EventFormDialogComponent } from "../event-form-dialog/event-form-dialog.component";
import { CreateEventDto } from "../../models/event";
import { unbox } from "ngrx-forms";
import { EventType, eventTypeToLabelMap } from "../../models/event-type";

@Component({
  selector: 'app-events',
  styleUrls: ['./events.component.scss'],
  templateUrl: './events.component.html'
})
export class EventsComponent implements OnInit, OnDestroy {
  events$: Observable<TableEvent[]>;
  eventsParams$: Observable<GetEventsParams>;
  eventsCount$: Observable<number>;

  displayedColumns: string[] = ['id', 'name', 'type', 'address', 'isPrivate', 'beginsAt', 'duration', 'createdAt', 'delete'];
  eventTypeToLabelMap = eventTypeToLabelMap;

  constructor(private eventsFacade: EventsFacade, private router: Router, private dialog: MatDialog) {
    this.events$ = eventsFacade.events$;
    this.eventsParams$ = eventsFacade.getEventsParams$;
    this.eventsCount$ = eventsFacade.eventsCount$;
  }

  ngOnInit() {
    this.eventsFacade.loadEvents();
  }

  ngOnDestroy() {
    this.eventsFacade.clearEvents();
  }

  getEventTypeLabel(type: EventType) {
    return eventTypeToLabelMap[type];
  }

  handleShowEventDetails(mouseEvent: MouseEvent, id: number) {
    mouseEvent.stopPropagation();
    this.router.navigate(['/events', id, 'details']);
  }

  handleOpenCreateNewEventDialog() {
    this.dialog
      .open(EventFormDialogComponent, { width: '800px' })
      .afterClosed()
      .pipe(
        filter(Boolean),
        map((form: EventForm): CreateEventDto => ({
          name: form.name,
          type: unbox(form.type),
          address: form.address,
          comment: form.comment,
          isPrivate: form.isPrivate,
          duration: form.duration,
          beginsAt: new Date(form.beginsAt).toJSON()
        })),
        tap((createEventDto) => this.eventsFacade.createEvent(createEventDto))
      )
      .subscribe();
  }

  handleToggleEventPrivate(event: TableEvent) {
    this.eventsFacade.updateEventPartially(event.id, { isPrivate: !event.isPrivate });
  }

  handleDeleteEvent(mouseEvent: MouseEvent, id: number) {
    mouseEvent.stopPropagation();
    this.eventsFacade.deleteEvent(id);
  }

}
