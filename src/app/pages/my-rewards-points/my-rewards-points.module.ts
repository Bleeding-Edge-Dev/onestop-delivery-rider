import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyRewardsPointsPageRoutingModule } from './my-rewards-points-routing.module';

import { MyRewardsPointsPage } from './my-rewards-points.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyRewardsPointsPageRoutingModule
  ],
  declarations: [MyRewardsPointsPage]
})
export class MyRewardsPointsPageModule {}
