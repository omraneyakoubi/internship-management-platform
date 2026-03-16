import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AffectationService, Affectation } from 'src/app/services/affectation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updateaffectation',
  templateUrl: './updateaffectation.component.html',
  styleUrls: ['./updateaffectation.component.css']
})
export class UpdateaffectationComponent implements OnInit {
  updateForm: FormGroup;
  affectationId: number;
  affectation: Affectation | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private affectationService: AffectationService
  ) {
    this.updateForm = this.fb.group({
      nomsociete: ['', Validators.required],
      sujet: ['', Validators.required],
      adresse: ['', Validators.required],
      numrsociete: ['', Validators.required],
      nomencadreurtechnique: ['', Validators.required],
      emailetud: ['', [Validators.required, Validators.email]]
    });
    this.affectationId = 0; // Initialize affectationId
  }

  ngOnInit(): void {
    this.affectationId = +this.route.snapshot.paramMap.get('id')!;
    this.affectationService.getAffectationById(this.affectationId).subscribe(
      (response: Affectation) => {
        this.affectation = response;
        this.updateForm.patchValue(this.affectation as any); // Cast to any to avoid type issues
      },
      (error) => {
        console.error('Error fetching affectation:', error);
        Swal.fire('Erreur', 'Impossible de charger l\'affectation', 'error');
      }
    );
  }

  onSubmit(): void {
    if (this.updateForm.valid) {
      const updatedAffectation: Affectation = this.updateForm.value;
      this.affectationService.updateAffectation(this.affectationId, updatedAffectation).subscribe(
        () => {
          Swal.fire('Succès', 'L\'affectation a été mise à jour avec succès', 'success');
          this.router.navigate(['/etudiant/affectation']); // Redirect to affectation list page
        },
        error => {
          console.error('Error updating affectation:', error);
          Swal.fire('Erreur', 'Impossible de mettre à jour l\'affectation', 'error');
        }
      );
    } else {
      // Form is invalid, mark all fields as touched to display validation messages
      this.updateForm.markAllAsTouched();
      Swal.fire('Erreur', 'Veuillez remplir correctement tous les champs', 'error');
    }
  }
}
