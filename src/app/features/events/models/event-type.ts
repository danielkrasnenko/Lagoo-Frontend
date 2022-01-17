import { Option } from "@app/models";

export enum EventType {
  Ceremony = 1,
  Convention = 2,
  Festival = 3,
  Happening = 4,
  MediaEvent = 5,
  Party = 6,
  SportingEvent = 7,
  VirtualEvent = 8
}

export const eventTypeToLabelMap: Record<EventType, string> = {
  [EventType.Ceremony]: 'Ceremony',
  [EventType.Convention]: 'Convention',
  [EventType.Festival]: 'Festival',
  [EventType.Happening]: 'Happening',
  [EventType.MediaEvent]: 'Media Event',
  [EventType.Party]: 'Party',
  [EventType.SportingEvent]: 'Sporting Event',
  [EventType.VirtualEvent]: 'Virtual Event'
}

export const eventTypeOptions: Option<number>[] = [
  {
    label: eventTypeToLabelMap[EventType.Ceremony],
    value: EventType.Ceremony
  },
  {
    label: eventTypeToLabelMap[EventType.Convention],
    value: EventType.Convention
  },
  {
    label: eventTypeToLabelMap[EventType.Festival],
    value: EventType.Festival
  },
  {
    label: eventTypeToLabelMap[EventType.Happening],
    value: EventType.Happening
  },
  {
    label: eventTypeToLabelMap[EventType.MediaEvent],
    value: EventType.MediaEvent
  },
  {
    label: eventTypeToLabelMap[EventType.Party],
    value: EventType.Party
  },
  {
    label: eventTypeToLabelMap[EventType.SportingEvent],
    value: EventType.SportingEvent
  },
  {
    label: eventTypeToLabelMap[EventType.VirtualEvent],
    value: EventType.VirtualEvent
  }
];
