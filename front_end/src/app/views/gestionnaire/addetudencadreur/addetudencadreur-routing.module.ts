import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddetudencadreurComponent } from './addetudencadreur/addetudencadreur.component';

const routes: Routes = [
  {path:"",component:AddetudencadreurComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddetudencadreurRoutingModule { }
