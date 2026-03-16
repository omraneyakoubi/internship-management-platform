import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RapportRoutingModule } from './rapport-routing.module';
import { RapportComponent } from './rapport/rapport.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    RapportComponent
  ],
  imports: [
    CommonModule,
    RapportRoutingModule,
    HttpClientModule
  ]
})
export class RapportModule { }
