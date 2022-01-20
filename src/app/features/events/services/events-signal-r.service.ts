import { Injectable } from "@angular/core";
import * as SignalR from "@microsoft/signalr";
import { HubConnection } from "@microsoft/signalr";
import { EventDto } from "../models/event";
import { EventsFacade } from "../+state/events.facade";
import { EventsHubClientMethods, EventsHubServerMethods } from "../models/events-hub-methods";

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
    this.connection.on(EventsHubClientMethods.TakeActionOnUpdate, this.handleEventUpdate);
    this.connection.on(EventsHubClientMethods.TakeActionOnDelete, this.handleEventDeletion);
  }

  addSelectedEventListeners() {
    this.connection.on(EventsHubClientMethods.TakeActionOnUpdate, this.handleSelectedEventUpdate);
    this.connection.on(EventsHubClientMethods.TakeActionOnDelete, this.handleSelectedEventDeletion);
  }

  removeListeners() {
    this.connection.off(EventsHubClientMethods.TakeActionOnUpdate);
    this.connection.off(EventsHubClientMethods.TakeActionOnDelete);
  }

  notifyOthersAboutUpdate(eventDto: EventDto) {
    return this.connection.invoke(EventsHubServerMethods.NotifyOthersAboutUpdateAsync, eventDto)
      .catch(err => console.error(err));
  }

  notifyOthersAboutDeletion(id: number) {
    return this.connection.invoke(EventsHubServerMethods.NotifyOthersAboutDeletionAsync, id)
      .catch(err => console.error(err));
  }

  private handleEventUpdate = (event: EventDto) => {
    this.eventsFacade.applyEventUpdateFromSignalR(event);
  }

  private handleSelectedEventUpdate = (event: EventDto) => {
    this.eventsFacade.applySelectedEventUpdateFromSignalR(event);
  }

  private handleEventDeletion = (id: number) => {
    this.eventsFacade.applyEventDeletionFromSignalR(id)
  }

  private handleSelectedEventDeletion = (id: number) => {
    this.eventsFacade.applySelectedEventDeletionFromSignalR(id)
  }
}
