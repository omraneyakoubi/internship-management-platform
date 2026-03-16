import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemandestageRoutingModule } from './demandestage-routing.module';
import { DemandestageComponent } from './demandestage/demandestage.component';


@NgModule({
  declarations: [
    DemandestageComponent
  ],
  imports: [
    CommonModule,
    DemandestageRoutingModule
  ]
})
export class DemandestageModule { }
