import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontlayoutComponent } from './layout/frontlayout/frontlayout.component';
import { GestionnaireComponent } from './layout/gestionnaire/gestionnaire.component';
import { EtudiantComponent } from './layout/etudiant/etudiant.component';
import { EncadrentComponent } from './layout/encadrent/encadrent.component';
import { DirecteurComponent } from './layout/directeur/directeur.component';
import { GuardGuard } from './guards/guard.guard';


const routes: Routes = [
  {path:'',component:FrontlayoutComponent,children:[
    {path:'',loadChildren:()=>import('./views/front/login/login.module').then(m=>m.LoginModule)},

    {path:'login',loadChildren:()=>import('./views/front/login/login.module').then(m=>m.LoginModule)},
    {path:'signup',loadChildren:()=>import('./views/front/signup/signup.module').then(m=>m.SignupModule)}
  ]},
  {path:'gestionnaire',component:GestionnaireComponent,canActivate:[GuardGuard],children:[
    {path:'',loadChildren:()=>import('./views/gestionnaire/utilisateur/utilisateur.module').then(m=>m.UtilisateurModule)},

    {path:'users',loadChildren:()=>import('./views/gestionnaire/utilisateur/utilisateur.module').then(m=>m.UtilisateurModule)},
    {path:'oblig',loadChildren:()=>import('./views/gestionnaire/obligatoire/obligatoire.module').then(m=>m.ObligatoireModule)},
    {path:'addoblig',loadChildren:()=>import('./views/gestionnaire/addobligatoire/addobligatoire.module').then(m=>m.AddobligatoireModule)},
    {path:'updateoblig/:id',loadChildren:()=>import('./views/gestionnaire/updateoblig/updateoblig.module').then(m=>m.UpdateobligModule)},

    {path:'addusers',loadChildren:()=>import('./views/gestionnaire/addusers/addusers.module').then(m=>m.AddusersModule)},
    {path:'liste',loadChildren:()=>import('./views/gestionnaire/etudencadreur/etudencadreur.module').then(m=>m.EtudencadreurModule)},
    {path:'addetudencadreur',loadChildren:()=>import('./views/gestionnaire/addetudencadreur/addetudencadreur.module').then(m=>m.AddetudencadreurModule)},
    {path:'updatetudencadrent/:id',loadChildren:()=>import('./views/gestionnaire/updateetudencadrent/updateetudencadrent.module').then(m=>m.UpdateetudencadrentModule)},


  ]},
  {path:'etudiant',component:EtudiantComponent,canActivate:[GuardGuard],children:[
    {path:'depot',loadChildren:()=>import('./views/etudiant/depot/depot.module').then(m=>m.DepotModule)},
    {path:'adddepot',loadChildren:()=>import('./views/etudiant/adddepot/adddepot.module').then(m=>m.AdddepotModule)},
    {path:'rapport',loadChildren:()=>import('./views/etudiant/rapport/rapport.module').then(m=>m.RapportModule)},
    {path:'addrapport',loadChildren:()=>import('./views/etudiant/addrapport/addrapport.module').then(m=>m.AddrapportModule)},
    {path:'depot/:id',loadChildren:()=>import('./views/etudiant/updatedepot/updatedepot.module').then(m=>m.UpdatedepotModule)},
    {path:'rapport/:id',loadChildren:()=>import('./views/etudiant/updaterapport/updaterapport.module').then(m=>m.UpdaterapportModule)},
    {path:'affectation',loadChildren:()=>import('./views/etudiant/affectation/affectation.module').then(m=>m.AffectationModule)},
        {path:'addaffectation',loadChildren:()=>import('./views/etudiant/addaffectation/addaffectation.module').then(m=>m.AddaffectationModule)},

        {path:'updateaffectation/:id',loadChildren:()=>import('./views/etudiant/updateaffectaion/updateaffectaion.module').then(m=>m.UpdateaffectaionModule)},



   

  ]},
  {path:'encadrent',component:EncadrentComponent,canActivate:[GuardGuard],children:[
    {path:'encadrements',loadChildren:()=>import('./views/encadrent/encadrement/encadrement.module').then(m=>m.EncadrementModule)},
    {path:'planning',loadChildren:()=>import('./views/encadrent/planning/planning.module').then(m=>m.PlanningModule)},
    {path:'rapports',loadChildren:()=>import('./views/encadrent/rapports/rapports.module').then(m=>m.RapportsModule)},



 
   

  ]},

  {path:'directeur',component:DirecteurComponent,canActivate:[GuardGuard],children:[
    {path:'demandestage',loadChildren:()=>import('./views/directeur/demandestage/demandestage.module').then(m=>m.DemandestageModule)},
    {path:'etudiantsujet',loadChildren:()=>import('./views/directeur/etudsujet/etudsujet.module').then(m=>m.EtudsujetModule)},

    


 
   

  ]},


 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
