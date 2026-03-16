import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateaffectationComponent } from './updateaffectation/updateaffectation.component';

const routes: Routes = [
  {path:'',component:UpdateaffectationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateaffectaionRoutingModule { }
