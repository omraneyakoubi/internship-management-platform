import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdaterapportRoutingModule } from './updaterapport-routing.module';
import { UpdaterapportComponent } from './updaterapport/updaterapport.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UpdaterapportComponent
  ],
  imports: [
    CommonModule,
    UpdaterapportRoutingModule,
    ReactiveFormsModule
  ]
})
export class UpdaterapportModule { }
