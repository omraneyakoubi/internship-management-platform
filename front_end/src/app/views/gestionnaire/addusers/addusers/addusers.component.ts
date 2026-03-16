import { Component, OnInit } from '@angular/core';
import { AuthenticationService, User } from '../../../../services/authentification.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addusers',
  templateUrl: './addusers.component.html',
  styleUrls: ['./addusers.component.css']
})
export class AddusersComponent implements OnInit {
  user: User = {
    cin: '',
    nom: '',
    prenom: '',
    email: '',
    etablissement: '',
    mdp: '',
    role: ''
  };

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const validationErrors = this.validateForm();
    if (validationErrors.length === 0) {
      this.authService.register(this.user).subscribe(
        () => {
          this.showSuccessAlert('User added successfully');
          // Reset form fields after successful registration
          this.sendmail(this.user.email, this.user.mdp,this.user.role); // Call sendmail with email and password

          this.resetForm();
        },
        error => {
          this.showErrorAlert('Error adding user');
          console.error('Error adding user', error);
        }
      );
    } else {
      this.showErrorAlert(validationErrors.join('\n'));
    }
  }

  validateForm(): string[] {
    const errors: string[] = [];
    
    if (!this.user.cin || !/^\d{8}$/.test(this.user.cin)) {
      errors.push('CIN must be 8 digits');
    }

    if (!this.user.nom) {
      errors.push('Nom is required');
    }

    if (!this.user.prenom) {
      errors.push('Prenom is required');
    }

    if (!this.user.email || !this.isValidEmail(this.user.email)) {
      errors.push('Valid email is required');
    }

    if (!this.user.etablissement) {
      errors.push('Etablissement is required');
    }

    if (!this.user.mdp || !this.isValidPassword(this.user.mdp)) {
      errors.push('Password must contain at least one letter and one number');
    }

    if (!this.user.role) {
      errors.push('Role is required');
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
      role: ''
    };
  }
  sendmail(email: string, mdp: string,role:string) {
    let reqObj = {
      email: this.user.email,
      mdp: this.user.mdp,
      role: this.user.role

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
