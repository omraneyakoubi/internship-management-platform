import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EtudencadreurRoutingModule } from './etudencadreur-routing.module';
import { EtudencadreurComponent } from './etudencadreur/etudencadreur.component';


@NgModule({
  declarations: [
    EtudencadreurComponent
  ],
  imports: [
    CommonModule,
    EtudencadreurRoutingModule
  ]
})
export class EtudencadreurModule { }
