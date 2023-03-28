import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreditNotesPage } from './credit-notes.page';

const routes: Routes = [
  {
    path: '',
    component: CreditNotesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreditNotesPageRoutingModule {}
