import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EncadrementRoutingModule } from './encadrement-routing.module';
import { EncadrementComponent } from './encadrement/encadrement.component';


@NgModule({
  declarations: [
    EncadrementComponent
  ],
  imports: [
    CommonModule,
    EncadrementRoutingModule
  ]
})
export class EncadrementModule { }
