import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyRewardsPointsPage } from './my-rewards-points.page';

const routes: Routes = [
  {
    path: '',
    component: MyRewardsPointsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyRewardsPointsPageRoutingModule {}
