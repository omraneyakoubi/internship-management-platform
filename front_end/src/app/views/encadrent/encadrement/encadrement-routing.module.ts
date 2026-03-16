import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EncadrementComponent } from './encadrement/encadrement.component';

const routes: Routes = [
  {path:'',component:EncadrementComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EncadrementRoutingModule { }
