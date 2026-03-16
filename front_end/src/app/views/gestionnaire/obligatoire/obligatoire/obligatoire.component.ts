import { Component, OnInit } from '@angular/core';
import { Obligatoire, ObligatoireService } from '../../../../services/obligatoire.service';
import jsPDF from 'jspdf';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-obligatoire',
  templateUrl: './obligatoire.component.html',
  styleUrls: ['./obligatoire.component.css']
})
export class ObligatoireComponent implements OnInit {

  obligatoires: Obligatoire[] = [];

  constructor(private obligatoireService: ObligatoireService) { }

  ngOnInit(): void {
    this.getAllObligatoires();
  }
  

  getAllObligatoires() {
    this.obligatoireService.getObligatoires()
      .subscribe(
        (response: any) => {
          this.obligatoires = response.data; // Assuming data is the array in the response
        },
        error => {
          console.error('Error fetching obligatoires:', error);
          // Handle error
        }
      );
  }

  printObligatoires(): void {
    const doc = new jsPDF();
    let yPos = 10;

    this.obligatoires.forEach(obligatoire => {
      doc.text(`Name: ${obligatoire.cin}`, 10, yPos);
      doc.text(`Description: ${obligatoire.domaine}`, 10, yPos + 10);
      yPos += 20; // Increment the Y position for the next item
    });

    // Save the PDF
    doc.save('obligatoires.pdf');
  }

  deleteobg(obligatoire: Obligatoire) {
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
        this.obligatoireService.deleteObligatoire(obligatoire.id).subscribe(
          (response: any) => {
            if (response.status === 1) {
              // Remove the deleted obligatoire from the array
              this.obligatoires = this.obligatoires.filter(o => o.id !== obligatoire.id);
              Swal.fire('Deleted!', 'Obligatoire has been deleted.', 'success');
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
                }, 1);              });            }
          },
          error => {
            console.error('Error deleting obligatoire:', error);
            Swal.fire('Error', 'Failed to delete obligatoire', 'error');
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Obligatoire deletion was cancelled', 'info');
      }
    });
  }
}
