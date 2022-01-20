import { createReducer, on } from "@ngrx/store";
import { TableEvent } from "../models/table-event";
import { Event } from "../models/event";
import { box, createFormGroupState, FormGroupState, onNgrxForms, setValue, updateGroup } from "ngrx-forms";
import { EVENT_FORM_ID, EventForm } from "../models/event-form";
import { EventType } from "../models/event-type";
import { GetEventsParams } from "../models/get-events-params";
import * as EventsActions from './events.actions';

export const EVENTS_FEATURE_KEY = 'events';

export interface EventsState {
  events: TableEvent[],
  eventsAreLoading: boolean;
  eventsCount: number;
  getEventsParams: GetEventsParams;
  selectedEvent?: Event;
  eventForm: FormGroupState<EventForm>;
}

const eventFormInitialState = createFormGroupState<EventForm>(EVENT_FORM_ID, {
  name: '',
  type: box(EventType.Ceremony),
  address: '',
  comment: '',
  isPrivate: false,
  duration: '00:00:00',
  beginsAt: ''
});

export const initialState: EventsState = {
  events: [],
  eventsAreLoading: false,
  eventsCount: 0,
  getEventsParams: {},
  selectedEvent: undefined,
  eventForm: eventFormInitialState
};

export const reducer = createReducer(
  initialState,
  onNgrxForms(),
  on(EventsActions.loadEvents, state => ({
    ...state,
    eventsAreLoading: true
  })),
  on(EventsActions.loadEventsSuccess, (state, { events,count }) => ({
    ...state,
    events,
    eventsCount: count,
    eventsAreLoading: false
  })),
  on(EventsActions.loadEventsFail, state => ({
    ...state,
    eventsAreLoading: false
  })),
  on(EventsActions.loadSelectedEventSuccess, (state, { event }) => ({
    ...state,
    selectedEvent: event
  })),
  on(EventsActions.updateEventSuccess, (state, { updatedEvent }) => ({
    ...state,
    selectedEvent: updatedEvent
  })),
  on(EventsActions.updateEventPartiallySuccess, (state, { updatedEvent }) => ({
    ...state,
    events: state.events.map(event => event.id === updatedEvent.id
      ? ({
        id: event.id,
        name: updatedEvent.name,
        type: updatedEvent.type,
        address: updatedEvent.address,
        isPrivate: updatedEvent.isPrivate,
        duration: updatedEvent.duration,
        beginsAt: updatedEvent.beginsAt,
        createdAt: updatedEvent.createdAt
      })
      : event
    )
  })),
  on(EventsActions.deleteEventSuccess, (state, { id }) => ({
    ...state,
    events: state.events.filter(event =>  event.id !== id)
  })),
  on(EventsActions.updateGetEventsParams, (state, { params }) => ({
    ...state,
    getEventsParams: {
      ...state.getEventsParams,
      ...params
    }
  })),
  on(EventsActions.applyEventUpdateFromSignalR, (state, { updatedEvent }) => ({
    ...state,
    events: state.events.map(event => event.id === updatedEvent.id
      ? ({
        id: event.id,
        name: updatedEvent.name,
        type: updatedEvent.type,
        address: updatedEvent.address,
        isPrivate: updatedEvent.isPrivate,
        duration: updatedEvent.duration,
        beginsAt: updatedEvent.beginsAt,
        createdAt: updatedEvent.createdAt
      })
      : event
    )
  })),
  on(EventsActions.applyEventDeletionFromSignalR, (state, { id }) => ({
    ...state,
    events: state.events.filter(event => event.id !== id)
  })),
  on(EventsActions.applySelectedEventUpdateFromSignalR, (state, { updatedEvent }) => ({
    ...state,
    selectedEvent: state.selectedEvent?.id === updatedEvent.id ? updatedEvent : state.selectedEvent
  })),
  on(EventsActions.applySelectedEventDeletionFromSignalR, (state, { id }) => ({
    ...state,
    selectedEvent: state.selectedEvent?.id === id ? undefined : state.selectedEvent
  })),
  on(EventsActions.fillEventFormWithData, (state, { event }) => ({
    ...state,
    eventForm: updateGroup(state.eventForm, {
      name: setValue(event.name),
      type: setValue(box(event.type)),
      address: setValue(event.address),
      comment: setValue(event.comment),
      isPrivate: setValue(event.isPrivate),
      duration: setValue(event.duration),
      beginsAt: setValue(event.beginsAt)
    })
  })),
  on(EventsActions.clearEventForm, state => ({
    ...state,
    eventForm: eventFormInitialState
  })),
  on(EventsActions.clearEvents, state => ({
    ...state,
    events: []
  })),
  on(EventsActions.clearSelectedEvent, state => ({
    ...state,
    selectedEvent: undefined
  })),
  on(EventsActions.clearData, _ => initialState)
);
