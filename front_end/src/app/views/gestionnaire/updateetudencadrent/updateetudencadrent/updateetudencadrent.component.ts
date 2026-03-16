import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Etudencadreur, EtudencadreurService } from '../../../../services/etudencadreur.service';

@Component({
  selector: 'app-updateetudencadrent',
  templateUrl: './updateetudencadrent.component.html',
  styleUrls: ['./updateetudencadrent.component.css']
})
export class UpdateetudencadrentComponent implements OnInit {
  etudencadreur: Etudencadreur = {
    id: 0,
    nomet: '',
    emailetud: '',
    encadreur: '',
    sujet: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private etudEncadreurService: EtudencadreurService
  ) { }

  ngOnInit(): void {
    this.getEtudEncadreur();
  }

  getEtudEncadreur(): void {
    const idString = this.route.snapshot.paramMap.get('id');
    if (idString) {
      const id = +idString;
      if (!isNaN(id)) {
        this.etudEncadreurService.getEtudencadreurById(id)
          .subscribe(etudencadreur => {
            this.etudencadreur = etudencadreur;
            this.etudencadreur.id = id; // Set the id here
          });
      } else {
        // Handle invalid ID
      }
    } else {
      // Handle missing ID
    }
  }

  updateEtudiantEncadreur(): void {
    console.log('Updating etudiant encadreur:', this.etudencadreur.id);
    
    this.etudEncadreurService.updateEtudencadreur(this.etudencadreur.id, this.etudencadreur)
      .subscribe(response => {
        console.log('Update response:', response);
        // Reload the data after successful update
        this.router.navigate(['/gestionnaire/liste'], { queryParams: { reload: true } });
      }, error => {
        // Handle error
        console.error('Update error:', error);
      });
  }
  

  resetForm(): void {
    this.etudencadreur = {
      id: 0,
      nomet: '',
      emailetud: '',
      encadreur: '',
      sujet: ''
    };
  }
}
