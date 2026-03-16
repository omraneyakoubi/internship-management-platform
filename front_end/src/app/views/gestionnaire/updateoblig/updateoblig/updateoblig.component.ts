import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Obligatoire, ObligatoireService } from '../../../../services/obligatoire.service';

@Component({
  selector: 'app-updateoblig',
  templateUrl: './updateoblig.component.html',
  styleUrls: ['./updateoblig.component.css']
})
export class UpdateobligComponent implements OnInit {
  obligatoire: Obligatoire = {
    id: 0,
    annee: 0,
    domaine: '',
    nom: '',
    prenom: '',
    email: '',
    cin: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private obligatoireService: ObligatoireService
  ) { }

  ngOnInit(): void {
    this.getObligatoire();
  }

  getObligatoire(): void {
    const idString = this.route.snapshot.paramMap.get('id');
    if (idString) {
      const id = +idString;
      if (!isNaN(id)) {
        this.obligatoireService.getObligatoireById(id)
          .subscribe(obligatoire => {
            this.obligatoire = obligatoire;
            this.obligatoire.id = id; // Set the id here
          });
      } else {
        // Handle invalid ID
      }
    } else {
      // Handle missing ID
    }
  }
  
  
  

  updateObligatoire(): void {
    console.log('Updating obligatoire:', this.obligatoire.id);
  
    this.obligatoireService.updateObligatoire(this.obligatoire)
      .subscribe(response => {
        console.log('Update response:', response);
        // Reload the data after successful update
        this.router.navigate(['/gestionnaire/oblig'], { queryParams: { reload: true } });
      }, error => {
        // Handle error
        console.error('Update error:', error);
      });
  }
  
  
  
  
  
  

  resetForm(): void {
    this.obligatoire = {
      id: 0,
      annee: 0,
      domaine: '',
      nom: '',
      prenom: '',
      email: '',
      cin: ''
    };
  }
}
