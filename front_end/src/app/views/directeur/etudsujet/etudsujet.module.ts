import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EtudsujetRoutingModule } from './etudsujet-routing.module';
import { EtudsujetComponent } from './etudsujet/etudsujet.component';


@NgModule({
  declarations: [
    EtudsujetComponent
  ],
  imports: [
    CommonModule,
    EtudsujetRoutingModule
  ]
})
export class EtudsujetModule { }
