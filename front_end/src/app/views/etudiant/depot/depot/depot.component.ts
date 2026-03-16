import { Component, OnInit } from '@angular/core';
import { Depot, DepotService } from '../../../../services/depot.service';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-depot',
  templateUrl: './depot.component.html',
  styleUrls: ['./depot.component.css']
})
export class DepotComponent implements OnInit {
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

  constructor(private depotService: DepotService) { }

  ngOnInit(): void {
    this.getDepots();
  }

  getDepots(): void {
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

  printDepot(index: number): void {
    const depot = this.depots[index];
    const doc = new jsPDF();
    let yPos = 5;
    
    // Add header
    doc.setFontSize(16);
    doc.text('Université de Jendouba', 5, yPos);
    yPos += 5;
    doc.text('Faculté des Sciences Juridiques, Economiques et de Gestion de Jendouba', 5, yPos);
    yPos += 5;
    doc.text('Jendouba, Le.../..../10..', 5, yPos);
    yPos += 10;
    doc.setFontSize(14);
    doc.text('-Demande de stage-', 10, yPos);
    yPos += 10;

    // Add main content
    doc.text('Dans le cadre de l\'ouverture de la faculté sur son environnement et pour permettre aux  ', 5, yPos);
    yPos += 5;
    doc.text('étudiants d\'enrichir leur connaissance et d\'acquérir une meilleure insertion professionnelle,', 5, yPos);
    yPos += 5;
    doc.text('nous avons l\'honneur de venir par la présente solliciter de votre ', 5, yPos);
    yPos += 5;
    doc.text('haute bienveillance d\'accepter l\'étudiant(e):', 5, yPos);
    yPos += 10;
    doc.text(`Nom et Prénom : ${depot.nomprenom}`, 10, yPos);
    yPos += 7;
    doc.text(`N CIN ou Passeport: ${depot.cin}`, 10, yPos);
    yPos += 7;
     doc.text(`Inscrit(e) en: ${depot.annee}`, 10, yPos);
    yPos += 7;
    doc.text(`Diplôme: ${depot.diplome}`, 10, yPos);
    yPos += 7;
    doc.text(`Spécialité: ${depot.spec}`, 10, yPos);
    yPos += 7;
    doc.text('Année Universitaire: 2024-2025', 10, yPos);
    yPos += 10;

    // Add institution details
    doc.text('INSTITUTION:', 5, yPos);
    yPos += 10;
   
    doc.text('ADRESSE:', 10, yPos);
    yPos += 20;
    
   
    doc.text('Comptant sur votre précieuse et aimable collaboration, veuillez agréer, Mme / Mr,', 5, yPos);
    yPos += 5;
    doc.text('nos salutations les meilleures', 5, yPos);
    yPos += 10;

    // Add footer
    doc.text('Directeur des Stages de la FSJEGI', 5, yPos);
    yPos += 5;
    doc.text('SAMI GHARBI', 5, yPos);
    yPos += 10;
    doc.text('Institution d\'accueil', 5, yPos);
    yPos += 10;
    doc.text('Adresse: Campus Universitaire de Jendouba, Avenue de l\'UMA, 8189, Jendouba, Tunisie.', 10, yPos);
    yPos += 10;
    doc.text('Tel:(+216) 78.600.300/(+216) 78.600.299;', 10, yPos);
    yPos += 10;
    doc.text('Fax: (+216) 78.601.176;', 10, yPos);
    yPos += 10;
    doc.text('E-mail: www.fsjegi@rnu.tn', 10, yPos);

    // Save the PDF
    doc.save(`depot_${index + 1}.pdf`);
  }
  
  
  

  deleteDepot(depot: Depot): void {
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
        this.depotService.deleteDepot(depot.id).subscribe(
          (response: any) => {
            if (response.status === 1) {
              // Remove the deleted entry from the array
              this.depots = this.depots.filter((item: Depot) => item.id !== depot.id);
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
                }, 1);              });               }
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
