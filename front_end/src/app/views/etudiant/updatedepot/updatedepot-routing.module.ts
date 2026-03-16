import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdatedepotComponent } from './updatedepot/updatedepot.component';

const routes: Routes = [
  {path:'',component:UpdatedepotComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdatedepotRoutingModule { }
