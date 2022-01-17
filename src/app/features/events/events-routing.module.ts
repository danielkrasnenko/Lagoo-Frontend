import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { EventsComponent } from "./components/events/events.component";
import { EventDetailsComponent } from "./components/event-details/event-details.component";

const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: EventsComponent
  },
  {
    path: ':id/details',
    component: EventDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule {}
