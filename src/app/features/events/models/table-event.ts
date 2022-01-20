import { EventType } from "./event-type";

export interface GetTableEvents {
  count: number;
  events: TableEvent[]
}

export interface TableEvent {
  id: number;
  name: string;
  type: EventType;
  address: string;
  isPrivate: boolean;
  duration: string;
  beginsAt: string;
  createdAt: string;
}

export interface GetTableEventsDto {
  count: number;
  events: TableEventDto[]
}

export interface TableEventDto {
  id: number;
  name: string;
  type: EventType;
  address: string;
  isPrivate: boolean;
  duration: string;
  beginsAt: string;
  createdAt: string;
}

