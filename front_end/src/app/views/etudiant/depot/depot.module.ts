import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepotRoutingModule } from './depot-routing.module';
import { DepotComponent } from './depot/depot.component';


@NgModule({
  declarations: [
    DepotComponent
  ],
  imports: [
    CommonModule,
    DepotRoutingModule
  ]
})
export class DepotModule { }
