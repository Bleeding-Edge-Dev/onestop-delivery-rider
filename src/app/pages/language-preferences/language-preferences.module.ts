import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LanguagePreferencesPageRoutingModule } from './language-preferences-routing.module';

import { LanguagePreferencesPage } from './language-preferences.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LanguagePreferencesPageRoutingModule
  ],
  declarations: [LanguagePreferencesPage]
})
export class LanguagePreferencesPageModule {}
