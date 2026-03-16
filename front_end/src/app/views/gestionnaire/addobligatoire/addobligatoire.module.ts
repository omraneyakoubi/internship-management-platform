import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { AddobligatoireRoutingModule } from './addobligatoire-routing.module';
import { AddobligatoireComponent } from './addobligatoire/addobligatoire.component';


@NgModule({
  declarations: [
    AddobligatoireComponent
  ],
  imports: [
    CommonModule,
    AddobligatoireRoutingModule,
    FormsModule
  ]
})
export class AddobligatoireModule { }
