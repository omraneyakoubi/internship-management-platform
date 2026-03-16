import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateetudencadrentRoutingModule } from './updateetudencadrent-routing.module';
import { UpdateetudencadrentComponent } from './updateetudencadrent/updateetudencadrent.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UpdateetudencadrentComponent
  ],
  imports: [
    CommonModule,
    UpdateetudencadrentRoutingModule,
    FormsModule
  ]
})
export class UpdateetudencadrentModule { }
