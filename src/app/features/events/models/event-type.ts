import { Option } from "@app/models";

export enum EventType {
  Ceremony = 'ceremony',
  Convention = 'convention',
  Festival = 'festival',
  Happening = 'happening',
  MediaEvent = 'mediaEvent',
  Party = 'party',
  SportingEvent = 'sportingEvent',
  VirtualEvent = 'virtualEvent'
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

export const eventTypeOptions: Option<string>[] = [
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
