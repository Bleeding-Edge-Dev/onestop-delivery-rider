import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LanguagePreferencesPage } from './language-preferences.page';

const routes: Routes = [
  {
    path: '',
    component: LanguagePreferencesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LanguagePreferencesPageRoutingModule {}
