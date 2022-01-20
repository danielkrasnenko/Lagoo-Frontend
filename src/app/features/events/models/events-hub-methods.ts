export enum EventsHubClientMethods {
  TakeActionOnUpdate = 'TakeActionOnUpdate',
  TakeActionOnDelete = 'TakeActionOnDelete'
}

export enum EventsHubServerMethods {
  NotifyOthersAboutUpdateAsync = 'NotifyOthersAboutUpdateAsync',
  NotifyOthersAboutDeletionAsync = 'NotifyOthersAboutDeletionAsync'
}
