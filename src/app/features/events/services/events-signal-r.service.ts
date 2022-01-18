import { Injectable } from "@angular/core";
import * as SignalR from "@microsoft/signalr";
import { HubConnection } from "@microsoft/signalr";
import { Event } from "../models/event";
import { EventsFacade } from "../+state/events.facade";
import { EventsHubMethod } from "../models/events-hub-method";

@Injectable()
export class EventsSignalRService {
  private readonly hubApiUrl = 'http://localhost:5000/events-hub';
  private connection: HubConnection;

  constructor(private eventsFacade: EventsFacade) {
    this.connection = new SignalR.HubConnectionBuilder()
      .withUrl(this.hubApiUrl)
      .build();

    this.connection
      .start()
      .then(() => console.log('Connection to Events Hub started'))
      .catch(err => console.error('Error while starting connection to Events Hub', err.message));
  }

  addEventsListeners() {
    this.connection.on(EventsHubMethod.Updated, this.handleEventUpdate);
    this.connection.on(EventsHubMethod.Deleted, this.handleEventDeletion);
  }

  addSelectedEventListeners() {
    this.connection.on(EventsHubMethod.Updated, this.handleSelectedEventUpdate);
    this.connection.on(EventsHubMethod.Deleted, this.handleSelectedEventDeletion);
  }

  removeListeners() {
    this.connection.off(EventsHubMethod.Updated);
    this.connection.off(EventsHubMethod.Deleted);
  }

  private handleEventUpdate(event: Event) {
    this.eventsFacade.applyEventUpdateFromSignalR(event);
  }

  private handleSelectedEventUpdate(event: Event) {
    this.eventsFacade.applySelectedEventUpdateFromSignalR(event);
  }

  private handleEventDeletion(id: number) {
    this.eventsFacade.applyEventDeletionFromSignalR(id)
  }

  private handleSelectedEventDeletion(id: number) {
    this.eventsFacade.applySelectedEventDeletionFromSignalR(id)
  }
}
