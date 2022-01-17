import { createAction, props } from "@ngrx/store";
import { HttpErrorResponse } from "@angular/common/http";
import { TableEvent } from "../models/table-event";
import { CreateEventDto, Event, UpdateEventDto, UpdateEventPartiallyDto } from "../models/event";
import { GetEventsParams } from "../models/get-events-params";

export const loadEvents = createAction('[Events] Load Events');

export const loadEventsSuccess = createAction('[Events] Load Events Success', props<{ events: TableEvent[]; count: number; }>());

export const loadEventsFail = createAction('[Events] Load Events Fail', props<{ error: HttpErrorResponse }>());

export const loadSelectedEvent = createAction('[Events] Load Selected Event', props<{ id: number }>());

export const loadSelectedEventSuccess = createAction('[Events] Load Selected Event Success', props<{ event: Event }>());

export const loadSelectedEventFail = createAction('[Events] Load Selected Event Fail', props<{ error: HttpErrorResponse }>());

export const createEvent = createAction('[Events] Create Event', props<{ createEventDto: CreateEventDto }>());

export const createEventSuccess = createAction('[Events] Create Event Success', props<{ event: Event }>());

export const createEventFail = createAction('[Events] Create Event Fail', props<{ error: HttpErrorResponse }>());

export const updateEvent = createAction('[Events] Update Event', props<{ id: number, updateEventDto: UpdateEventDto }>());

export const updateEventSuccess = createAction('[Events] Update Event Success', props<{ event: Event }>());

export const updateEventFail = createAction('[Events] Update Event Fail', props<{ error: HttpErrorResponse }>());

export const updateEventPartially = createAction('[Events] Update Event Partially', props<{ id: number, updateEventPartiallyDto: UpdateEventPartiallyDto }>());

export const updateEventPartiallySuccess = createAction('[Events] Update Event Partially Success', props<{ event: Event }>());

export const updateEventPartiallyFail = createAction('[Events] Update Event Partially Fail', props<{ error: HttpErrorResponse }>());

export const deleteEvent = createAction('[Events] Delete Event', props<{ id: number }>())

export const deleteEventSuccess = createAction('[Events] Delete Event Success');

export const deleteEventFail = createAction('[Events] Delete Event Fail', props<{ error: HttpErrorResponse }>())

export const updateGetEventsParams = createAction('[Events] Update Get Events Params', props<{ params: GetEventsParams }>());

export const fillEventFormWithData = createAction('[Events] Fill Event Form with Data', props<{ event: Event }>());

export const clearEventForm = createAction('[Events] Clear Event Form');

export const clearEvents = createAction('[Events] Cleat Events');

export const clearSelectedEvent = createAction('[Events] Clear Selected Event');

export const clearData = createAction('[Events] Clear Data');
