import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddaffectationComponent } from './addaffectation/addaffectation.component';

const routes: Routes = [
  {path:'',component:AddaffectationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddaffectationRoutingModule { }
