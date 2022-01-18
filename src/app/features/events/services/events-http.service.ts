import { Injectable } from "@angular/core";
import { GetEventsParams } from "../models/get-events-params";
import { HttpClient } from "@angular/common/http";
import { GetTableEvents, GetTableEventsDto, TableEvent, TableEventDto } from "../models/table-event";
import { Observable } from "rxjs";
import { CreateEventDto, Event, EventDto, UpdateEventDto, UpdateEventPartiallyDto } from "../models/event";

@Injectable()
export class EventsHttpService {
  private readonly apiEndpoint = '/api/events';

  constructor(private http: HttpClient) {}

  loadEvents(params: GetEventsParams): Observable<GetTableEvents> {
    return this.http.get<GetTableEventsDto>(this.apiEndpoint, { params: params as any });
  }

  loadSelectedEvent(id: number): Observable<Event> {
    return this.http.get<EventDto>(this.getEventUrl(id));
  }

  createEvent(createEventDto: CreateEventDto): Observable<Event> {
    return this.http.post<EventDto>(this.apiEndpoint, createEventDto);
  }

  updateEvent(id: number, updateEventDto: UpdateEventDto): Observable<Event> {
    return this.http.put<EventDto>(this.getEventUrl(id), updateEventDto);
  }

  updateEventPartially(id: number, updateEventPartiallyDto: UpdateEventPartiallyDto): Observable<Event> {
    return this.http.patch<EventDto>(this.getEventUrl(id), updateEventPartiallyDto);
  }

  deleteEvent(id: number) {
    return this.http.delete(this.getEventUrl(id));
  }

  private getEventUrl(id: number) {
    return `${this.apiEndpoint}/${id}`;
  }
}
