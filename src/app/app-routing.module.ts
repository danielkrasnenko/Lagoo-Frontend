import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from "./common-components/not-found/not-found.component";
import { MainLayoutComponent } from "./common-components/main-layout/main-layout.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'news-feed'
  },
  {
    path: 'news-feed',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        // loadChildren: () => import('./features/news-feed.news-feed.module').then(m => m.NewsFeedModule)
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
