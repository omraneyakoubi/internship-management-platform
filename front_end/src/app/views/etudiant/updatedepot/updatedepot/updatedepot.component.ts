import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Depot, DepotService } from '../../../../services/depot.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updatedepot',
  templateUrl: './updatedepot.component.html',
  styleUrls: ['./updatedepot.component.css']
})
export class UpdatedepotComponent implements OnInit {
  depot: Depot = {
    id: 0,
    cin: '',
    nomprenom: '',
    inscri: '',
    diplome: '',
    spec: '',
    annee: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private depotService: DepotService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.getDepot(id);
  }

  getDepot(id: number): void {
    this.depotService.getDepotById(id)
      .subscribe(
        (depot: Depot) => {
          this.depot = depot;
        },
        error => {
          console.error('Error fetching depot:', error);
        }
      );
  }

  onSubmit(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to update this entry?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'No, cancel',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.depotService.updateDepot(this.depot)
          .subscribe(
            response => {
              Swal.fire('Updated!', 'Entry has been updated.', 'success').then(() => {
                this.router.navigate(['/etudiant/depot']);
              });
            },
            error => {
              console.error('Error updating depot:', error);
              Swal.fire('Error', 'Failed to update entry', 'error');
            }
          );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Entry update was cancelled', 'info');
      }
    });
  }

  resetForm(): void {
    // Implement form reset logic here if needed
  }
}
