import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ObligatoireComponent } from './obligatoire/obligatoire.component';

const routes: Routes = [
  {path:'',component:ObligatoireComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObligatoireRoutingModule { }
