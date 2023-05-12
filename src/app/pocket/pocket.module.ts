import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PocketPageRoutingModule } from './pocket-routing.module';

import { PocketPage } from './pocket.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { DepositModalComponent } from './deposit-modal/deposit-modal.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PocketPageRoutingModule,
    ComponentsModule
  ],
  providers: [ DatePipe ],
  declarations: [PocketPage,DepositModalComponent]
})
export class PocketPageModule {}
