import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemandestageComponent } from './demandestage/demandestage.component';

const routes: Routes = [
  {path:'',component:DemandestageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemandestageRoutingModule { }
