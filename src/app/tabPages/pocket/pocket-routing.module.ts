import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PocketPage } from './pocket.page';

const routes: Routes = [
  {
    path: '',
    component: PocketPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PocketPageRoutingModule {}
