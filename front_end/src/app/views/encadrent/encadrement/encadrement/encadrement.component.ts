import { Component, OnInit } from '@angular/core';
import { EtudencadreurService } from '../../../../services/etudencadreur.service';

@Component({
  selector: 'app-encadrement',
  templateUrl: './encadrement.component.html',
  styleUrls: ['./encadrement.component.css']
})
export class EncadrementComponent implements OnInit {
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
}