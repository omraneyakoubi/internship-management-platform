import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RapportService } from '../../../../services/rapport.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updaterapport',
  templateUrl: './updaterapport.component.html',
  styleUrls: ['./updaterapport.component.css']
})
export class UpdaterapportComponent implements OnInit {
  rapportForm!: FormGroup;
  id!: number;
  rapportFile!: File | undefined;
  nomprenom: string = ''; // Default value for nomprenom

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private rapportService: RapportService
  ) { }

  ngOnInit(): void {
    this.initForm();
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? +idParam : 0;
    this.getRapportDetails(this.id);
  }

  initForm(): void {
    this.rapportForm = this.formBuilder.group({
      nomprenom: [''],
      rapport: ['']
    });
  }
  
  getRapportDetails(id: number): void {
    this.rapportService.getRapportDetailsById(id)
      .subscribe(
        (data: any) => {
          console.log('Response data:', data);
          
          // Check if data is a Blob
          if (data instanceof Blob) {
            console.error('Response data is a Blob. Expected JSON data.');
            return;
          }
  
          if (data.status === 1 && data.data) {
            const rapportDetails = data.data;
            this.nomprenom = rapportDetails.nomprenom || 'Unknown';
            this.rapportFile = rapportDetails.rapport;
            
            this.rapportForm.patchValue({
              nomprenom: this.nomprenom,
              rapport: this.rapportFile // Set rapport value in the form
            });
          } else {
            console.error('Error fetching rapport details:', data);
          }
        },
        error => {
          console.error('Error fetching rapport:', error);
        }
      );
  }
  

  onSubmit(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to update the rapport. Are you sure you want to proceed?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append('nomprenom', this.rapportForm.get('nomprenom')!.value);
        if (this.rapportFile) {
          formData.append('rapport', this.rapportFile);
        }
  
        this.rapportService.updateRapport(this.id, formData)
          .subscribe(
            response => {
              console.log('Rapport updated successfully:', response);
              Swal.fire(
                'Updated!',
                'The rapport has been updated.',
                'success'
              );
              this.router.navigate(['/etudiant/rapport']);
            },
            error => {
              console.error('Error updating rapport:', error);
              Swal.fire(
                'Error!',
                'Failed to update rapport. Please try again later.',
                'error'
              );
            }
          );
      }
    });
  }
  

  resetForm(): void {
    this.rapportForm.reset();
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.rapportFile = file;
    }
  }
}
