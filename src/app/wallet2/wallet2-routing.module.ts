import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Wallet2Page } from './wallet2.page';

const routes: Routes = [
  {
    path: '',
    component: Wallet2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Wallet2PageRoutingModule {}
