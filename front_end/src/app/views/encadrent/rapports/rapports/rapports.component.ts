import { Component, OnInit } from '@angular/core';
import { RapportService } from '../../../../services/rapport.service'; // Import your RapportService


@Component({
  selector: 'app-rapports',
  templateUrl: './rapports.component.html',
  styleUrls: ['./rapports.component.css']
})
export class RapportsComponent implements OnInit {

  rapports: any[] = []; // Array to store the fetched rapports

  constructor(private rapportService: RapportService) { }

  ngOnInit(): void {
    this.getRapports(); // Call the method to fetch rapports on component initialization
  }

  getRapports() {
    this.rapportService.getAllRapports().subscribe(
      (data: any) => {
        this.rapports = data.data; // Assuming your service returns data in the format { status: 1, data: [...] }
      },
      error => {
        console.error('Error fetching rapports:', error);
      }
    );
  }

  downloadRapport(rapportId: number, rapportFileName: string) {
    this.rapportService.downloadRapport(rapportId).subscribe(
      (response: any) => {
        const blob = new Blob([response], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.style.display = 'none';
        a.href = url;
        a.download = rapportFileName;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error => {
        console.error('Error downloading rapport:', error);
      }
    );
  }
}
