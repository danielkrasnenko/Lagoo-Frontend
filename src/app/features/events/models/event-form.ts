import { EventType } from "./event-type";
import { Boxed } from "ngrx-forms";

export const EVENT_FORM_ID = 'EVENT_FORM_ID';

export interface EventForm {
  name: string;
  type: Boxed<EventType>;
  address: string;
  comment: string;
  isPrivate: boolean;
  beginsAt: string;
  duration: number;
}
