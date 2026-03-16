import { Component, OnInit } from '@angular/core';
import { Affectation, AffectationService } from '../../../../services/affectation.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addaffectation',
  templateUrl: './addaffectation.component.html',
  styleUrls: ['./addaffectation.component.css']
})
export class AddaffectationComponent implements OnInit {

  affectation: Affectation = {
    id: 0,
    nomsociete: '',
    sujet: '',
    adresse: '',
    numrsociete: '',
    nomencadreurtechnique: '',
    emailetud: ''
  };

  constructor(private affectationService: AffectationService, private router: Router) { }

  ngOnInit(): void { }

  onSubmit(): void {
    const validationErrors = this.validateForm();
    if (validationErrors.length === 0) {
      this.affectationService.createAffectation(this.affectation)
        .subscribe(() => {
          this.showSuccessAlert('Affectation entry added successfully');
          this.router.navigate(['/etudiant/affectation']);
          this.resetForm();
        }, error => {
          this.showErrorAlert('Error adding affectation entry');
          console.error('Error adding affectation entry:', error);
        });
    } else {
      this.showErrorAlert(validationErrors.join('\n'));
    }
  }

  resetForm(): void {
    this.affectation = {
      id: 0,
      nomsociete: '',
      sujet: '',
      adresse: '',
      numrsociete: '',
      nomencadreurtechnique: '',
      emailetud: ''
    };
  }

  validateForm(): string[] {
    const errors: string[] = [];

    if (!this.affectation.nomsociete) {
      errors.push('Nom de la société is required');
    }
    if (!this.affectation.sujet) {
      errors.push('Sujet is required');
    }
    if (!this.affectation.adresse) {
      errors.push('Adresse is required');
    }
    if (!this.affectation.numrsociete) {
      errors.push('Numéro de société is required');
    }
    if (!this.affectation.nomencadreurtechnique) {
      errors.push('Nom de l\'encadreur technique is required');
    }
    if (!this.affectation.emailetud || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.affectation.emailetud)) {
      errors.push('Valid email is required');
    }

    return errors;
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
}
