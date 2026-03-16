import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateobligRoutingModule } from './updateoblig-routing.module';
import { UpdateobligComponent } from './updateoblig/updateoblig.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UpdateobligComponent
  ],
  imports: [
    CommonModule,
    UpdateobligRoutingModule,
    FormsModule
  ]
})
export class UpdateobligModule { }
