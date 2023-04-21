import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PocketPageRoutingModule } from './pocket-routing.module';

import { PocketPage } from './pocket.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PocketPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PocketPage]
})
export class PocketPageModule {}
