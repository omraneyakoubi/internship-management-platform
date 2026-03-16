import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateobligComponent } from './updateoblig/updateoblig.component';

const routes: Routes = [
  {path:'',component:UpdateobligComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateobligRoutingModule { }
