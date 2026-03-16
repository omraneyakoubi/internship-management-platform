import { Component, OnInit } from '@angular/core';
import { Etudencadreur, EtudencadreurService } from '../../../../services/etudencadreur.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addetudencadreur',
  templateUrl: './addetudencadreur.component.html',
  styleUrls: ['./addetudencadreur.component.css']
})
export class AddetudencadreurComponent implements OnInit {

  etudencadreur: Etudencadreur = {
    id: 0,
    nomet: '',
    emailetud:'',
    encadreur: '',
    sujet: ''
  };

  constructor(private etudencadreurService: EtudencadreurService,private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const validationErrors = this.validateForm();
    if (validationErrors.length === 0) {
      this.etudencadreurService.createEtudencadreur(this.etudencadreur)
        .subscribe(() => {
          this.showSuccessAlert('Etudencadreur entry added successfully');
          this.router.navigate(['/gestionnaire/liste']);
          this.resetForm();
        }, error => {
          this.showErrorAlert('Error adding etudencadreur entry');
          console.error('Error adding etudencadreur entry:', error);
        });
    } else {
      this.showErrorAlert(validationErrors.join('\n'));
    }
  }

  validateForm(): string[] {
    const errors: string[] = [];
    
    if (!this.etudencadreur.nomet) {
      errors.push('Nom etudiant is required');
    }

    if (!this.etudencadreur.emailetud || !this.isValidEmail(this.etudencadreur.emailetud)) {
      errors.push('Valid email is required for etudiant');
    }

    if (!this.etudencadreur.encadreur) {
      errors.push('Encadreur is required');
    }

    if (!this.etudencadreur.sujet) {
      errors.push('Sujet is required');
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
    this.etudencadreur = {
      id: 0,
      nomet: '',
      emailetud:'',
      encadreur: '',
      sujet: ''
    };
  }

}
