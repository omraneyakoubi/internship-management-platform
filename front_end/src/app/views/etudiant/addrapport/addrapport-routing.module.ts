import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddrapportComponent } from './addrapport/addrapport.component';

const routes: Routes = [
  {path:'',component:AddrapportComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddrapportRoutingModule { }
