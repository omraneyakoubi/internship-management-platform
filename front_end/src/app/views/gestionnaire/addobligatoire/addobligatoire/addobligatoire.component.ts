import { Component, OnInit } from '@angular/core';
import { Obligatoire, ObligatoireService } from '../../../../services/obligatoire.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addobligatoire',
  templateUrl: './addobligatoire.component.html',
  styleUrls: ['./addobligatoire.component.css']
})
export class AddobligatoireComponent implements OnInit {

  obligatoire: Obligatoire = {
    id: 0,
    annee: 0,
    domaine: '',
    nom: '',
    prenom: '',
    email: '',
    cin: ''
  };

  constructor(private obligatoireService: ObligatoireService,private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const validationErrors = this.validateForm();
    if (validationErrors.length === 0) {
      this.obligatoireService.createObligatoire(this.obligatoire)
        .subscribe(() => {
          this.showSuccessAlert('Obligatoire entry added successfully');
          this.router.navigate(['/gestionnaire/oblig']);

          this.resetForm();
        }, error => {
          this.showErrorAlert('Error adding obligatoire entry');
          console.error('Error adding obligatoire entry:', error);
        });
    } else {
      this.showErrorAlert(validationErrors.join('\n'));
    }
  }

  validateForm(): string[] {
    const errors: string[] = [];
    
    if (!this.obligatoire.annee || !/^\d{4}$/.test(this.obligatoire.annee.toString())) {
      errors.push('Year must be a 4-digit number');
    }

    if (!this.obligatoire.domaine) {
      errors.push('Domaine is required');
    }

    if (!this.obligatoire.nom) {
      errors.push('Nom is required');
    }

    if (!this.obligatoire.prenom) {
      errors.push('Prenom is required');
    }

    if (!this.obligatoire.email || !this.isValidEmail(this.obligatoire.email)) {
      errors.push('Valid email is required');
    }

    if (!this.obligatoire.cin || !/^\d{8}$/.test(this.obligatoire.cin)) {
      errors.push('CIN must be 8 digits');
    }
    
    return errors;
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  showErrorAlert(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message
    });
  }

  showSuccessAlert(message: string) {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: message
    });
  }

  resetForm() {
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
