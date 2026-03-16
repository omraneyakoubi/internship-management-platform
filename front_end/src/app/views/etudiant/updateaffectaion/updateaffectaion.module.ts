import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateaffectaionRoutingModule } from './updateaffectaion-routing.module';
import { UpdateaffectationComponent } from './updateaffectation/updateaffectation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UpdateaffectationComponent
  ],
  imports: [
    CommonModule,
    UpdateaffectaionRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UpdateaffectaionModule { }
