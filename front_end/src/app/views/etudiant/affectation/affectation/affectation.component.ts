import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { Affectation, AffectationService } from 'src/app/services/affectation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-affectation',
  templateUrl: './affectation.component.html',
  styleUrls: ['./affectation.component.css']
})
export class AffectationComponent implements OnInit {
  @ViewChild('exampleModal') modal: any;

  affectationList: Affectation[] = [];
  selectedAffectation: Affectation | null = null;

  constructor(private affectationService: AffectationService ,private router:Router) { }

  ngOnInit(): void {
    this.getAllAffectations();
  }

  showAlert(emailetud?: string) {
    Swal.fire({
      title: 'Salut!',
      text: 'Vous avez approuvé ce sujet !',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      if (emailetud) {
        this.sendMail(emailetud);
      }
    });
  }

  getAllAffectations() {
    this.affectationService.getAffectations().subscribe(
      (response: any) => {
        if (response.status === 1) {
          this.affectationList = response.data;
          console.log("Affectation List:", this.affectationList);
        } else {
          console.error('Error fetching affectationList:', response.error);
        }
      },
      error => {
        console.error('Error fetching affectationList:', error);
      }
    );
  }
  confirmDelete(affectation: Affectation): void {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Voulez-vous vraiment supprimer cette affectation?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteAffectation(affectation);
      }
    });
  }
  
  deleteAffectation(affectation: Affectation): void {
    this.affectationService.deleteAffectation(affectation.id).subscribe(
      () => {
        this.affectationList = this.affectationList.filter(item => item.id !== affectation.id);
        Swal.fire('Supprimé!', 'L\'entrée a été supprimée.', 'success');
      },
      error => {
        console.error('Erreur lors de la suppression:', error);
        Swal.fire('Erreur', 'Impossible de supprimer l\'entrée', 'error');
      }
    );
  }
  navigateToUpdateAffectation(id: number): void {
    this.router.navigate(['/etudiant/updateaffectation', id]);
    console.log("tststst",id);
    
  }
  
  setAffectation(affectation: Affectation): void {
    this.selectedAffectation = affectation;
  }

  sendMail(emailetud: string) {
    const reqObj = { email: emailetud };
    console.log("Sendmail request:", reqObj);

    this.affectationService.sendMail(reqObj).subscribe(
      (data: any) => {
        console.log("Email sent successfully:", data);
      },
      (error: any) => {
        console.error("Error sending email:", error);
      }
    );
  }
  printaffectation(aff: Affectation): void {
    if (!aff) {
      console.error('No affectation selected');
      return;
    }
  
    const doc = new jsPDF();
    let yPos = 10;
  
    doc.text('Faculté des Sciences Juridiques, Economiques et de Gestion de Jendouba', 10, yPos);
    yPos += 10;
    doc.text('Jendouba, Le ... / ... / 20...', 10, yPos);
    yPos += 20; // Adding extra space for date
  
    doc.text('- Lettre d\'affectation en stage -', 10, yPos);
    yPos += 20; // Adding extra space for title
  
  
    const t1 = 'Nous vous remercions d\'avoir accepté les demandes de stages des étudiants de la FSJEG de Jendouba, et nous attestons par la présente que l\'étudiant(e) :';
    const t2 = ''; // Add any additional text you need here
    const ct = `${t1}${t2}`;
  
    doc.setTextColor(0, 0, 0); // Reset text color
    const st1 = doc.splitTextToSize(ct, 190);
    doc.text(st1, 10, yPos);
    yPos += (st1.length * 10);
  
    doc.text(`Nom et Prénom :  `, 10, yPos);
    yPos += 10;
    doc.text(`Diplôme :  `, 10, yPos);
    yPos += 10;
    doc.text(`Année Universitaire :  `, 10, yPos);
    yPos += 10;
    doc.text(`N° CIN ou Passeport :  `, 10, yPos);
    yPos += 10;
    doc.text(`Inscrit(e) en :  `, 10, yPos);
    yPos += 10;
    doc.text(`Spécialité :  `, 10, yPos);
    yPos += 10;
  
  
    const text1 = 'a été affecté(e) à votre honorable institution pour réaliser un stage obligatoire et pratique de fin d\'études, et ce, du ... / ... / 20... au ... / ... / 20....';
  const text2 = 'L\'étudiant(e) est tenu(e) d\'élaborer un rapport de stage.';
  const combinedText = `${text1}${text2}`;

  doc.setTextColor(0, 0, 0); // Reset text color
  const tx = doc.splitTextToSize(combinedText, 190);
  doc.text(tx, 10, yPos);
  yPos += (tx.length * 10);
    
  
    doc.text(`INSTITUTION : ${aff.nomsociete}`, 10, yPos);
    yPos += 10;
    doc.text(`Adresse : ${aff.adresse}`, 10, yPos);
    yPos += 10;
    doc.text(`Numéro de RCS : ${aff.numrsociete}`, 10, yPos);
    yPos += 10;
    doc.text(`Sujet du stage : ${aff.sujet}`, 10, yPos);
    yPos += 20;
  
    doc.setTextColor(0, 0, 0); // Reset text color
    const splitText = doc.splitTextToSize('Comptant sur votre précieuse et aimable collaboration,\nveuillez agréer, Mme / Mr, nos salutations les meilleures.', 190);
    doc.text(splitText, 10, yPos);
    yPos += (splitText.length * 10); // Increase yPos based on the number of lines
  
    doc.text(`Directeur de stage : ${aff.nomencadreurtechnique}`, 10, yPos);
    yPos += 10;
    doc.text('Directeur des Services Communs', 10, yPos);
    yPos += 10;
  
    doc.text('SAMI GHARBI', 10, yPos);
    yPos += 10;
    doc.text('Directeur des Stages de la FSJEGJ', 10, yPos);
  
    // Save the PDF
    doc.save('affectation_letter.pdf');
  }
  
  
  
  
  
  
  
}
