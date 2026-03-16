import { Component, OnInit, ViewChild, AfterViewInit, Renderer2 } from '@angular/core';
import { EtudencadreurService } from '../../../../services/etudencadreur.service';
import Swal from 'sweetalert2';
import { PlanningService } from 'src/app/services/planning.service';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit, AfterViewInit {
  etudencadreurList: any[] = [];
  @ViewChild('addFormTemplate') addFormTemplate: any;

  constructor(
    private etudencadreurService: EtudencadreurService,
    private planningService: PlanningService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.getAllEtudencadreurs();
  }

  ngAfterViewInit(): void {
    console.log('Add Form Template:', this.addFormTemplate);
  }

  openAddModal(email: string) {
    const formTemplate = this.addFormTemplate.createEmbeddedView(null).rootNodes;
    if (!formTemplate) {
      console.error('Add form template is not available');
      return;
    }
  
    const formHTML = this.getTemplateHTML(formTemplate);
  
    Swal.fire({
      title: 'Add Planning',
      html: formHTML,
      showCancelButton: true,
      confirmButtonText: 'Add',
      preConfirm: () => {
        const date = (document.getElementById('date') as HTMLInputElement)?.value;
        const fedback = (document.getElementById('fedback') as HTMLInputElement)?.value;
        return { email, date, fedback };
      },
      didOpen: () => {
        // Set the email input field value when the modal is opened
        (document.getElementById('email') as HTMLInputElement).value = email;
      }
    }).then((result: any) => {
      if (result.isConfirmed) {
        const { email, date, fedback } = result.value;
        this.addPlanning(email, date, fedback);
      }
    });
  }

  viewPlanningByEmail(email: string) {
    this.planningService.getPlanningEntriesByEmail(email).subscribe(
      (response: any[]) => {
        console.log("Response:", response); // Log the response
        if (response && response.length > 0) {
          console.log("Response Data:", response);
          let tableRows = '';
          response.forEach((entry: any) => {
            tableRows += `<tr><td>${entry.date}</td><td>${entry.fedback}</td></tr>`;
          });
          const table = `
            <table class="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Feedback</th>
                </tr>
              </thead>
              <tbody>
                ${tableRows}
              </tbody>
            </table>
          `;
          Swal.fire({
            title: 'Planning Entries',
            html: table,
            icon: 'info'
          });
        } else {
          Swal.fire('Info', 'No planning entries found for this email', 'info');
        }
      },
      (error: any) => {
        console.error('Error fetching planning entries by email:', error);
        if (error && error.error && error.error.message) {
          Swal.fire('Error', error.error.message, 'error');
        } else {
          Swal.fire('Error', 'Failed to fetch planning entries', 'error');
        }
      }
    );
  }
  
  
  
  
  
  
  
  

  addPlanning(email: string, date: string, fedback: string) {
    
    this.planningService.createPlanningEntry(email, date, fedback).subscribe(
      (response: any) => {
        if (response.message === 'Planning entry created successfully') {
          Swal.fire('Success', 'Planning added successfully', 'success');
          this.sendmail(email, date,fedback); // Call sendmail with email and password
          this.getAllEtudencadreurs();
        } else {
          Swal.fire('Error', 'Failed to add planning', 'error');
        }
      },
      error => {
        console.error('Error adding planning:', error);
        Swal.fire('Error', 'Failed to add planning', 'error');
      }
    );
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

  private getTemplateHTML(rootNodes: any[]): string {
    const div = this.renderer.createElement('div');
    rootNodes.forEach(node => this.renderer.appendChild(div, node));
    return div.innerHTML;
  }

  sendmail(email: string, date: string, fedback: string) {
    let reqObj = {
      email: email,
      date: date,
      fedback: fedback
    };
  
    console.log("Sendmail request:", reqObj);
  
    this.planningService.sendMail(reqObj).subscribe(
      (data: any) => {
        console.log("Email sent successfully:", data);
        Swal.fire('Success', 'Email sent successfully', 'success');
      },
      (error: any) => {
        console.error("Error sending email:", error);
        let errorMessage = error.error.message || 'Failed to send email';
        console.log('Full error response:', error); // Log full error response
        Swal.fire('Error', errorMessage, 'error');
      }
    );
  }
  
  
  
  
}
