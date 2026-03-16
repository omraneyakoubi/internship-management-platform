import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RapportService } from '../../../../services/rapport.service';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-addrapport',
  templateUrl: './addrapport.component.html',
  styleUrls: ['./addrapport.component.css']
})
export class AddrapportComponent implements OnInit {
  rapportForm: FormGroup;
  rapportFile: File | null = null;

  constructor(private fb: FormBuilder, private rapportService: RapportService,private router:Router) {
    this.rapportForm = this.fb.group({
      nomprenom: ['', Validators.required],
      rapport: [null, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const validationErrors = this.validateForm();
    if (validationErrors.length === 0) {
      if (this.rapportForm.valid && this.rapportFile) {
        const formData = new FormData();
        formData.append('nomprenom', this.rapportForm.value.nomprenom);
        formData.append('rapport', this.rapportFile);

        this.rapportService.createRapport(formData).subscribe(
          (response: any) => {
            this.showSuccessAlert('Rapport ajouté avec succès');
            this.router.navigate(['/etudiant/rapport']);

            this.resetForm();
          },
          error => {
            this.showErrorAlert('Erreur lors de l\'ajout du rapport');
            console.error('Erreur lors de l\'ajout du rapport', error);
          }
        );
      }
    } else {
      this.showErrorAlert(validationErrors.join('\n'));
    }
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      this.rapportFile = event.target.files[0];
    }
  }

  resetForm() {
    this.rapportForm.reset();
    this.rapportFile = null;
  }

  validateForm(): string[] {
    const errors: string[] = [];
    
    if (!this.rapportForm.value.nomprenom) {
      errors.push('Nom et prénom sont requis');
    }

    if (!this.rapportFile) {
      errors.push('Veuillez sélectionner un fichier de rapport');
    }
    
    return errors;
  }

  showErrorAlert(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Erreur',
      text: message
    });
  }

  showSuccessAlert(message: string) {
    Swal.fire({
      icon: 'success',
      title: 'Succès',
      text: message
    });
  }
}
