import { Component, OnInit } from '@angular/core';
import { Depot, DepotService } from '../../../../services/depot.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adddepot',
  templateUrl: './adddepot.component.html',
  styleUrls: ['./adddepot.component.css']
})
export class AdddepotComponent implements OnInit {

  depot: Depot = {
    id: 0,
    cin: '',
    nomprenom: '',
    inscri: '',
    diplome: '',
    spec: '',
    annee: '',
  };

  constructor(private depotService: DepotService,private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const validationErrors = this.validateForm();
    if (validationErrors.length === 0) {
      this.depotService.createDepot(this.depot)
        .subscribe(() => {
          // Handle successful submission
          this.showSuccessAlert('Depot entry added successfully');
          this.router.navigate(['/etudiant/depot']);
          this.resetForm();
        }, error => {
          // Handle error
          this.showErrorAlert('Error adding depot entry');
          console.error('Error adding depot entry:', error);
        });
    } else {
      this.showErrorAlert(validationErrors.join('\n'));
    }
  }

  resetForm(): void {
    this.depot = {
      id: 0,
      cin: '',
      nomprenom: '',
      inscri: '',
      diplome: '',
      spec: '',
      annee: ''
    };
  }

  validateForm(): string[] {
    const errors: string[] = [];
    
    // CIN validation
    if (!this.depot.cin || !/^\d{8}$/.test(this.depot.cin)) {
      errors.push('CIN must be 8 digits');
    }
    
    // Other validations for your fields can go here...

    // Check if any field is empty
    if (!this.depot.cin || !this.depot.nomprenom || !this.depot.inscri || !this.depot.diplome || !this.depot.spec || !this.depot.annee) {
      errors.push('All fields are required');
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
