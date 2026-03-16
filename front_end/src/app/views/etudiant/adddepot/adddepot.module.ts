import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdddepotRoutingModule } from './adddepot-routing.module';
import { AdddepotComponent } from './adddepot/adddepot.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdddepotComponent
  ],
  imports: [
    CommonModule,
    AdddepotRoutingModule,
    FormsModule
  ]
})
export class AdddepotModule { }
