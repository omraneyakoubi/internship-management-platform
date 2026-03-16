import { Component, OnInit } from '@angular/core';
import { RapportService } from '../../../../services/rapport.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.css']
})
export class RapportComponent implements OnInit {
  rapports: any[] = [];

  constructor(private rapportService: RapportService, private router: Router) { }

  ngOnInit(): void {
    this.getRapports();
  }

  getRapports() {
    this.rapportService.getAllRapports().subscribe(
      (data: any) => {
        this.rapports = data.data;
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
        Swal.fire('Error', 'Failed to download rapport', 'error');
      }
    );
  }

  goToUpdateRapport(id: number): void {
    this.router.navigate(['/etudiant/updaterapport', id]);
  }

  deleteRapport(rapport: any): void {
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
        this.rapportService.deleteRapport(rapport.id).subscribe(
          (response: any) => {
            if (response.status === 1) {
              this.rapports = this.rapports.filter((item: any) => item.id !== rapport.id);
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
                }, 1);              });                           }
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
