import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AffectationRoutingModule } from './affectation-routing.module';
import { AffectationComponent } from './affectation/affectation.component';


@NgModule({
  declarations: [
    AffectationComponent
  ],
  imports: [
    CommonModule,
    AffectationRoutingModule
  ]
})
export class AffectationModule { }
