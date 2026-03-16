import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrontlayoutComponent } from './frontlayout/frontlayout.component';
import { RouterModule } from '@angular/router';
import { EtudiantComponent } from './etudiant/etudiant.component';
import { EncadrentComponent } from './encadrent/encadrent.component';
import { GestionnaireComponent } from './gestionnaire/gestionnaire.component';
import { DirecteurComponent } from './directeur/directeur.component';



@NgModule({
  declarations: [
  
    FrontlayoutComponent,
       EtudiantComponent,
       EncadrentComponent,
       GestionnaireComponent,
       DirecteurComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class LayoutModule { }
