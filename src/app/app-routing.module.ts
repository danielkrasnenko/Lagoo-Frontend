import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from "./common-components/not-found/not-found.component";
import { MainLayoutComponent } from "./common-components/main-layout/main-layout.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'events'
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
      },
      {
        path: 'events',
        loadChildren: () => import('./features/events/events.module').then(m => m.EventsModule)
      }
    ]
  },
  {
    path: 'not-found',
    pathMatch: 'full',
    component: NotFoundComponent
  },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
