import { Component } from '@angular/core';
import { AuthenticationService } from '../../../../services/authentification.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  mdp: string = '';
  error: string = '';

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  onSubmit() {
    console.log('Logging in...');
    this.authService.login(this.email, this.mdp).subscribe(
      (response: any) => {
        console.log('Login response:', response);
        const token = localStorage.getItem('token');
        console.log('Stored token:', token);        console.log('Logged in successfully');
        // Redirect based on role
        const userRole = response.body?.role; // Access role from response body
        console.log('Role:', userRole);
  
        // Show success alert
        this.showSuccessAlert('Logged in successfully');
  
        // Navigate based on role
        switch (userRole) {
          case 'etudiant':
            this.router.navigate(['/etudiant']);
            break;
          case 'gestionnaire':
            this.router.navigate(['/gestionnaire']);
            break;
          case 'directeur':
            this.router.navigate(['/directeur']);
            break;
          default:
            // Redirect to a default route if the role is not recognized
            this.router.navigate(['/']);
        }
      },
      error => {
        // Handle login error
        console.error('Error logging in:', error);
        this.error = 'Invalid email or password';
      }
    );
  }
  

  showSuccessAlert(message: string) {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: message
    });
  }

}
