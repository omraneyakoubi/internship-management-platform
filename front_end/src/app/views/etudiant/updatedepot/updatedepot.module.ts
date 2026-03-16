import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdatedepotRoutingModule } from './updatedepot-routing.module';
import { UpdatedepotComponent } from './updatedepot/updatedepot.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UpdatedepotComponent
  ],
  imports: [
    CommonModule,
    UpdatedepotRoutingModule,
    FormsModule
  ]
})
export class UpdatedepotModule { }
