import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TripHistoryPage } from './trip-history.page';

const routes: Routes = [
  {
    path: '',
    component: TripHistoryPage
  },
  {
    path: 'trip-details',
    loadChildren: () => import('./trip-details/trip-details.module').then( m => m.TripDetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TripHistoryPageRoutingModule {}
