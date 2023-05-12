import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyWalletPage } from './my-wallet.page';

const routes: Routes = [
  {
    path: '',
    component: MyWalletPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyWalletPageRoutingModule {}
