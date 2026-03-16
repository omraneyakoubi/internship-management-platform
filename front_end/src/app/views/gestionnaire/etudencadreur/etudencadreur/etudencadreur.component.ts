import { Component, OnInit } from '@angular/core';
import { EtudencadreurService } from '../../../../services/etudencadreur.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-etudencadreur',
  templateUrl: './etudencadreur.component.html',
  styleUrls: ['./etudencadreur.component.css']
})
export class EtudencadreurComponent implements OnInit {

  etudencadreurList: any[] = [];

  constructor(private etudencadreurService: EtudencadreurService) { }

  ngOnInit(): void {
    this.getAllEtudencadreurs();
  }

  getAllEtudencadreurs() {
    this.etudencadreurService.getAllEtudencadreurs().subscribe(
      (response: any) => {
        if (response.status === 1) {
          this.etudencadreurList = response.data; // Extracting data from the response
        } else {
          console.error('Error fetching etudencadreurs:', response.error);
        }
      },
      error => {
        console.log('Error fetching etudencadreurs:', error);
      }
    );
  }

  deleteEtudencadreur(etudencadreur: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this entry?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.etudencadreurService.deleteEtudencadreur(etudencadreur.id).subscribe(
          (response: any) => {
            if (response.status === 1) {
              // Remove the deleted entry from the array
              this.etudencadreurList = this.etudencadreurList.filter((item: any) => item.id !== etudencadreur.id);
              Swal.fire('Deleted!', 'Entry has been deleted.', 'success');
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
            console.error('Error deleting entry:', error);
            Swal.fire('Error', 'Failed to delete entry', 'error');
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Entry deletion was cancelled', 'info');
      }
    });
  }
}
