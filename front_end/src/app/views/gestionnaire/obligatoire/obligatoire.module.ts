import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ObligatoireRoutingModule } from './obligatoire-routing.module';
import { ObligatoireComponent } from './obligatoire/obligatoire.component';


@NgModule({
  declarations: [
    ObligatoireComponent
  ],
  imports: [
    CommonModule,
    ObligatoireRoutingModule
  ]
})
export class ObligatoireModule { }
