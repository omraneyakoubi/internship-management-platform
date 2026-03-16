import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, User } from '../../../../services/authentification.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: User = {
    cin: '',
    nom: '',
    prenom: '',
    email: '',
    etablissement: '',
    mdp: '',
    role:'etudiant'
  };

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    const validationErrors = this.validateForm();
    if (validationErrors.length === 0) {
      this.authService.checkEmailExists(this.user.email).subscribe(
        response => {
          if (response.exists) {
            this.showErrorAlert('Email already exists');
          } else {
            this.authService.register(this.user).subscribe(
              () => {
                this.showSuccessAlert('User added successfully');
                this.sendmail(this.user.email, this.user.mdp); // Call sendmail with email and password

                this.resetForm();
                this.router.navigate(['/login']); // Navigate to login page
              },
              error => {
                this.showErrorAlert('Error adding user');
              }
            );
          }
        },
        error => {
          this.showErrorAlert('Error checking email');
        }
      );
    } else {
      this.showErrorAlert(validationErrors.join('\n'));
    }
  }

  validateForm(): string[] {
    const errors: string[] = [];
    
    // CIN validation
    if (!this.user.cin || !/^\d{8}$/.test(this.user.cin)) {
      errors.push('CIN must be 8 digits');
    }
    
    // Nom validation
    if (!this.user.nom) {
      errors.push('Nom is required');
    }
    
    // Prenom validation
    if (!this.user.prenom) {
      errors.push('Prenom is required');
    }
    
    // Email validation
    if (!this.user.email || !this.isValidEmail(this.user.email)) {
      errors.push('Valid email is required');
    }
    
    // Etablissement validation
    if (!this.user.etablissement) {
      errors.push('Etablissement is required');
    }
    
    // Password validation
    if (!this.user.mdp || !this.isValidPassword(this.user.mdp)) {
      errors.push('Password must contain at least one letter and one number');
    }
  
    // Check if any field is empty
    if (!this.user.cin || !this.user.nom || !this.user.prenom || !this.user.email || !this.user.etablissement || !this.user.mdp) {
      errors.push('All fields are required');
    }
    
    return errors;
  }
  
  
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  isValidPassword(password: string): boolean {
    const containsLetter = /[a-zA-Z]/.test(password);
    const containsNumber = /\d/.test(password);
    return containsLetter && containsNumber;
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
    this.user = {
      cin: '',
      nom: '',
      prenom: '',
      email: '',
      etablissement: '',
      mdp: '',
      role:'etudiant',
    };
  }
  sendmail(email: string, mdp: string) {
    let reqObj = {
      email: this.user.email,
      mdp: this.user.mdp,
      role:this.user.role
    };
    console.log("Sendmail request:", reqObj);
  
    this.authService.sendMail(reqObj).subscribe(
      (data: any) => {
        console.log("Email sent successfully:", data);
      },
      (error: any) => {
        console.error("Error sending email:", error);
      }
    );
  }
}
