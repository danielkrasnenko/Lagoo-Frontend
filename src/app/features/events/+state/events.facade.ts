import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { EventsState } from "./events.reducer";
import * as EventsActions from './events.actions';
import * as EventsSelectors from './events.selectors';
import { CreateEventDto, Event, UpdateEventDto, UpdateEventPartiallyDto } from "../models/event";
import { GetEventsParams } from "../models/get-events-params";
import { first } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

@Injectable()
export class EventsFacade {
  events$ = this.store.select(EventsSelectors.getEvents);
  eventsAreLoading$ = this.store.select(EventsSelectors.getEventsLoadingState);
  eventsCount$ = this.store.select(EventsSelectors.getEventsCount);
  getEventsParams$ = this.store.select(EventsSelectors.getEventsParams);
  selectedEvent$ = this.store.select(EventsSelectors.getSelectedEvent);
  eventForm$ = this.store.select(EventsSelectors.getEventForm);

  constructor(private store: Store<EventsState>, private toastr: ToastrService, private router: Router) {}

  loadEvents() {
    this.store.dispatch(EventsActions.loadEvents());
  }

  loadSelectedEvent(id: number) {
    this.store.dispatch(EventsActions.loadSelectedEvent({ id }));
  }

  createEvent(createEventDto: CreateEventDto) {
    this.store.dispatch(EventsActions.createEvent({ createEventDto }))
  }

  updateEvent(id: number, updateEventDto: UpdateEventDto) {
    this.store.dispatch(EventsActions.updateEvent({ id, updateEventDto }));
  }

  updateEventPartially(id: number, updateEventPartiallyDto: UpdateEventPartiallyDto) {
    this.store.dispatch(EventsActions.updateEventPartially({ id, updateEventPartiallyDto }));
  }

  deleteEvent(id: number) {
    this.store.dispatch(EventsActions.deleteEvent({ id }));
  }

  applyEventUpdateFromSignalR(updatedEvent: Event) {
    this.store.dispatch(EventsActions.applyEventUpdateFromSignalR({ updatedEvent }));
  }

  applyEventDeletionFromSignalR(id: number) {
    this.events$.pipe(first()).subscribe(events => {
      if (!!events.find(event => event.id === id)) {
        this.toastr.info(`Event with an ID ${id} was deleted`);
      }
      this.store.dispatch(EventsActions.applyEventDeletionFromSignalR({ id }));
    });
  }

  applySelectedEventUpdateFromSignalR(updatedEvent: Event) {
    this.store.dispatch(EventsActions.applySelectedEventUpdateFromSignalR({ updatedEvent }))
  }

  applySelectedEventDeletionFromSignalR(id: number) {
    this.selectedEvent$.pipe(first()).subscribe(selectedEvent => {
      if (id === selectedEvent?.id) {
        this.toastr.info('Event has been deleted');
        this.router.navigate(['/events']);
      }
      this.store.dispatch(EventsActions.applySelectedEventDeletionFromSignalR({ id }));
    });
  }

  updateGetEventsParams(params: GetEventsParams) {
    this.store.dispatch(EventsActions.updateGetEventsParams({ params }))
  }

  fillEventFormWithData(event: Event) {
    this.store.dispatch(EventsActions.fillEventFormWithData({ event }));
  }

  clearEventForm() {
    this.store.dispatch(EventsActions.clearEventForm());
  }

  clearEvents() {
    this.store.dispatch(EventsActions.clearEvents());
  }

  clearSelectedEvent() {
    this.store.dispatch(EventsActions.clearSelectedEvent());
  }

  clearData() {
    this.store.dispatch(EventsActions.clearData());
  }
}
