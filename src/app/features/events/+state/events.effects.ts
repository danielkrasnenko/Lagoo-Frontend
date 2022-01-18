import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { ToastrService } from "ngx-toastr";
import * as EventsActions from './events.actions';
import * as EventsSelectors from './events.selectors';
import { catchError, map, mapTo, of, switchMap, tap, withLatestFrom } from "rxjs";
import { EventsHttpService } from "../services/events-http.service";
import { CreateEventDto, UpdateEventDto } from "../models/event";
import { unbox } from "ngrx-forms";
import { Router } from "@angular/router";

@Injectable()
export class EventsEffects {
  loadEvents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.loadEvents),
      withLatestFrom(this.store.select(EventsSelectors.getEventsParams), (_, params) => params),
      switchMap((params) =>
        this.eventsHttpService.loadEvents(params).pipe(
          map(response => EventsActions.loadEventsSuccess({ events: response.events, count: response.count })),
          catchError(error => of(EventsActions.loadEventsFail({ error })))
        )
      )
    )
  );

  loadSelectedEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.loadSelectedEvent),
      switchMap(({ id }) =>
        this.eventsHttpService.loadSelectedEvent(id).pipe(
          map(event => EventsActions.loadSelectedEventSuccess({ event })),
          catchError(error => of(EventsActions.loadSelectedEventFail({ error })))
        )
      )
    )
  );

  createEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.createEvent),
      switchMap(({ createEventDto }) =>
        this.eventsHttpService.createEvent(createEventDto).pipe(
          map(event => EventsActions.createEventSuccess({ event })),
          catchError(error => of(EventsActions.createEventFail({ error })))
        )
      )
    )
  );

  createEventSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.createEventSuccess),
      tap(({ event }) => this.router.navigate(['/events', event.id])),
      mapTo(EventsActions.clearEventForm())
    )
  );

  updateEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.updateEvent),
      switchMap(({ id, updateEventDto }) =>
        this.eventsHttpService.updateEvent(id, updateEventDto).pipe(
          map(event => EventsActions.updateEventSuccess({ event })),
          catchError(error => of(EventsActions.updateEventFail({ error })))
        )
      )
    )
  );

  updateEventSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.updateEventSuccess),
      mapTo(EventsActions.clearEventForm())
    )
  );

  updateEventPartially$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.updateEventPartially),
      switchMap(({ id, updateEventPartiallyDto }) =>
        this.eventsHttpService.updateEventPartially(id, updateEventPartiallyDto).pipe(
          map(event => EventsActions.updateEventPartiallySuccess({ event })),
          catchError(error => of(EventsActions.updateEventPartiallyFail({ error })))
        )
      )
    )
  );

  deleteEvent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.deleteEvent),
      switchMap(({ id }) =>
        this.eventsHttpService.deleteEvent(id).pipe(
          map(() => EventsActions.deleteEventSuccess()),
          catchError(error => of(EventsActions.deleteEventFail({ error })))
        )
      )
    )
  );

  applyEventDeletionFromSignalR$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.applyEventDeletionFromSignalR),
      withLatestFrom(this.store.select(EventsSelectors.getEvents), ({ id }, events) => ({ deletedEventId: id, events })),
      tap(({ deletedEventId, events }) => {
        if (!!events.find(event => event.id === deletedEventId)) {
          this.toastr.info(`Event with an ID ${deletedEventId} was deleted`);
        }
      })
    ),
    { dispatch: false }
  );

  applySelectedEventUpdateFromSignalR$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.applySelectedEventUpdateFromSignalR),
      withLatestFrom(this.store.select(EventsSelectors.getSelectedEvent), ({ updatedEvent }, selectedEvent) => ({ updatedEvent, selectedEvent })),
      tap(({ updatedEvent, selectedEvent }) => {
        if (updatedEvent.id === selectedEvent?.id) {
          this.toastr.info('Event has been updated');
        }
      })
    ),
    { dispatch: false }
  );

  applySelectedEventDeletionFromSignalR$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.applySelectedEventDeletionFromSignalR),
      withLatestFrom(this.store.select(EventsSelectors.getSelectedEvent), ({ id }, selectedEvent) => ({ deletedEventId: id, selectedEvent })),
      tap(({ deletedEventId, selectedEvent }) => {
        if (deletedEventId === selectedEvent?.id) {
          this.toastr.info('Event has been deleted');
          this.router.navigate(['/events']);
        }
      })
    ),
    { dispatch: false }
  );

  // Reload events when any of params has been updated
  updateGetEventsParams$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EventsActions.updateGetEventsParams),
      mapTo(EventsActions.loadEvents())
    )
  );

  handleError$ = createEffect(() =>
      this.actions$.pipe(
        ofType(
          EventsActions.loadEventsFail,
          EventsActions.loadSelectedEventFail,
          EventsActions.createEventFail,
          EventsActions.updateEventFail,
          EventsActions.updateEventPartiallyFail,
          EventsActions.deleteEventFail
        ),
        tap(({ error }) => this.showError(error.message))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private toastr: ToastrService,
    private router: Router,
    private eventsHttpService: EventsHttpService
  ) {}

  private showError(message: string) {
    this.toastr.error(message, 'Error' );
  }
}
