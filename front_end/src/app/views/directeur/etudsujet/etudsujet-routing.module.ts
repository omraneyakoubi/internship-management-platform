import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EtudsujetComponent } from './etudsujet/etudsujet.component';

const routes: Routes = [
  {path:'',component:EtudsujetComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EtudsujetRoutingModule { }
