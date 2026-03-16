import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdddepotComponent } from './adddepot/adddepot.component';

const routes: Routes = [
  {path:'',component:AdddepotComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdddepotRoutingModule { }
