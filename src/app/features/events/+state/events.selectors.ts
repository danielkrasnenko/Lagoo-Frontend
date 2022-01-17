import { createFeatureSelector, createSelector } from "@ngrx/store";
import { EVENTS_FEATURE_KEY, EventsState } from "./events.reducer";

const getEventsState = createFeatureSelector<EventsState>(EVENTS_FEATURE_KEY);

export const getEvents = createSelector(getEventsState, state => state.events);

export const getEventsLoadingState = createSelector(getEventsState, state => state.eventsAreLoading);

export const getEventsParams = createSelector(getEventsState, state => state.getEventsParams);

export const getEventsCount = createSelector(getEventsState, state => state.eventsCount);

export const getSelectedEvent = createSelector(getEventsState, state => state.selectedEvent);

export const getEventForm = createSelector(getEventsState, state => state.eventForm);
