import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateetudencadrentComponent } from './updateetudencadrent/updateetudencadrent.component';

const routes: Routes = [
  {path:'',component:UpdateetudencadrentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateetudencadrentRoutingModule { }
