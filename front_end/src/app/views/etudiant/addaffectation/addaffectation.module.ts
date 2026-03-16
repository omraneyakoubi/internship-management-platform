import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddaffectationRoutingModule } from './addaffectation-routing.module';
import { AddaffectationComponent } from './addaffectation/addaffectation.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddaffectationComponent
  ],
  imports: [
    CommonModule,
    AddaffectationRoutingModule,
    FormsModule
  ]
})
export class AddaffectationModule { }
