import { Component, OnInit } from '@angular/core';
import { AuthenticationService, User } from '../../../../services/authentification.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent implements OnInit {

  users: User[] = [];

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.authService.getAllUsers().subscribe(
      (response: any) => {
        if (response.status === 1) {
          this.users = response.data; // Extracting data from the response
        } else {
          console.error('Error fetching users:', response.error);
        }
      },
      error => {
        console.log('Error fetching users:', error);
      }
    );
  }
  deleteUser(user: User) {
    const userId = user.id;
    if (!userId) {
      console.error('User id is undefined');
      return;
    }
  
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this user?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        // Call your delete API method here
        this.authService.deleteUser(userId).subscribe(
          (response: any) => {
            if (response.status === 1) {
              // Remove the user from the array
              this.users = this.users.filter(u => u.id !== userId);
              Swal.fire({
                title: 'Deleted!',
                text: 'User has been deleted.',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500
              }).then(() => {
                // Reload the page after 1.5 seconds
              });
            } else {
              Swal.fire({
                title: 'Deleted!',
                text: 'User has been deleted.',
                icon: 'success',
                showConfirmButton: false,
                timer: 1500,
                
              }).then(() => {
                setTimeout(() => {
                  window.location.reload();
                }, 1);              });
            }
          },
          error => {
            console.error('Error deleting user:', error);
            Swal.fire('Error', 'Failed to delete user', 'error');
            setTimeout(() => {
              window.location.reload();
            }, 5);
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'User deletion was cancelled', 'info');
      }
    });
  }
  
  
  
  
}
