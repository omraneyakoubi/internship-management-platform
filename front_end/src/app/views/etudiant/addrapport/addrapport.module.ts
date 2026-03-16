import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddrapportRoutingModule } from './addrapport-routing.module';
import { AddrapportComponent } from './addrapport/addrapport.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddrapportComponent
  ],
  imports: [
    CommonModule,
    AddrapportRoutingModule,
    ReactiveFormsModule
  ]
})
export class AddrapportModule { }
