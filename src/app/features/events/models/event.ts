import { EventType } from "./event-type";

export interface Event {
  id: number;
  name: string;
  type: EventType;
  address: string;
  comment: string;
  isPrivate: boolean;
  duration: number;
  beginsAt: string;
  createdAt: string;
  lastModifiedAt: string;
}

export interface EventDto {
  id: number;
  name: string;
  type: EventType;
  address: string;
  comment: string;
  isPrivate: boolean;
  duration: number;
  beginsAt: string;
  createdAt: string;
  lastModifiedAt: string;
}

export interface CreateEventDto {
  name: string;
  type: EventType;
  address: string;
  comment: string;
  isPrivate: boolean;
  duration: number;
  beginsAt: string;
}

export interface UpdateEventDto {
  name: string;
  type: EventType;
  address: string;
  comment: string;
  isPrivate: boolean;
  duration: number;
  beginsAt: string;
}

export interface UpdateEventPartiallyDto {
  name?: string;
  type?: EventType;
  address?: string;
  comment?: string;
  isPrivate?: boolean;
  duration?: number;
  beginsAt?: string;
}
