import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EtudencadreurComponent } from './etudencadreur/etudencadreur.component';

const routes: Routes = [
{path:'',component:EtudencadreurComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EtudencadreurRoutingModule { }
