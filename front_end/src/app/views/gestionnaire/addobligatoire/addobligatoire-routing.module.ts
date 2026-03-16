import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddobligatoireComponent } from './addobligatoire/addobligatoire.component';

const routes: Routes = [
  {path:"",component:AddobligatoireComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddobligatoireRoutingModule { }
