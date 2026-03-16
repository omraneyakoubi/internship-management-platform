import { Component, OnInit } from '@angular/core';
import { Depot, DepotService } from '../../../../services/depot.service';
import jsPDF from 'jspdf';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-demandestage',
  templateUrl: './demandestage.component.html',
  styleUrls: ['./demandestage.component.css']
})
export class DemandestageComponent implements OnInit {

  depot: Depot = {
    id: 0,
    cin: '',
    nomprenom: '',
    inscri: '',
    diplome: '',
    spec: '',
    annee: ''
  };
  depots: Depot[] = [];
  selectedDepot: Depot | null = null; // Variable to hold the selected depot

  constructor(private depotService: DepotService) { }

  ngOnInit(): void {
    this.depotService.getDepots()
      .subscribe(
        (response: any) => {
          this.depots = response.data; // Assuming data is the array in the response
        },
        error => {
          console.error('Error fetching depots:', error);
          // Handle error
        }
      );
  }

  printDepot(): void {
    const doc = new jsPDF();
    let yPos = 10;
    
    this.depots.forEach((depot, index) => {
      doc.text(`Depot ${index + 1}:`, 10, yPos);
      doc.text(`CIN: ${depot.cin}`, 20, yPos + 10);
      doc.text(`Inscription: ${depot.inscri}`, 20, yPos + 20);
      doc.text(`Diplôme: ${depot.diplome}`, 20, yPos + 30);
      doc.text(`Spécialité: ${depot.spec}`, 20, yPos + 40);
      doc.text(`Année: ${depot.annee}`, 20, yPos + 50);
      yPos += 60; // Increase the Y position for the next depot
    });

    // Save the PDF
    doc.save('depots.pdf');
  }

  showAlert(message: string, icon: 'success' | 'error' | 'info' = 'success') {
    Swal.fire({
      title: message,
      icon: icon,
      confirmButtonText: 'OK'
    });
  }

  approveDepot(): void {
    if (!this.selectedDepot) {
      return;
    }
    // Logic for approving the depot
    this.showAlert('Vous avez approuvé cette demande !');
    // You can put your approval logic here
  }

  deleteDepot(): void {
    if (!this.selectedDepot) {
      return;
    }

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
        if (!this.selectedDepot) {
          return;
        }
        this.depotService.deleteDepot(this.selectedDepot.id).subscribe(
          (response: any) => {
            if (response.status === 1) {
              // Remove the deleted entry from the array
              this.depots = this.depots.filter((item: Depot) => item.id !== this.selectedDepot!.id);
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
                }, 1);
              });
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
  

  // Method to set the selected depot
  setDepot(depot: Depot): void {
    this.selectedDepot = depot;
  }
  
}
