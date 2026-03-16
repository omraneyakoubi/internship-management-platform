import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdaterapportComponent } from './updaterapport/updaterapport.component';

const routes: Routes = [
  {path:'',component:UpdaterapportComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdaterapportRoutingModule { }
