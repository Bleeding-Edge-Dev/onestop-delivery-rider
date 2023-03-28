import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreditNotesPageRoutingModule } from './credit-notes-routing.module';

import { CreditNotesPage } from './credit-notes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreditNotesPageRoutingModule
  ],
  declarations: [CreditNotesPage]
})
export class CreditNotesPageModule {}
