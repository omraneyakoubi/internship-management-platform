import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddetudencadreurRoutingModule } from './addetudencadreur-routing.module';
import { AddetudencadreurComponent } from './addetudencadreur/addetudencadreur.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddetudencadreurComponent
  ],
  imports: [
    CommonModule,
    AddetudencadreurRoutingModule,
    FormsModule
  ]
})
export class AddetudencadreurModule { }
