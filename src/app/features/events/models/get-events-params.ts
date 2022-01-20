import { EventType } from "./event-type";
import { SortingOrder } from "@app/models";

export interface GetEventsParams {
  page?: number;
  pageSize?: number;
  type?: EventType;
  isPrivate?: boolean;
  sortBy?: GetEventsSortBy;
  sortingOrder?: SortingOrder;
}

enum GetEventsSortBy {
  Name = 'name',
  Duration = 'duration',
  BeginsAt = 'beginsAt',
  CreatedAt = 'createdAt'
}
