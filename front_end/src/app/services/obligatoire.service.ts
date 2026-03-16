import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Interface for obligatoire entry
export interface Obligatoire {
  id: number;
  annee: number;
  domaine: string;
  nom: string;
  prenom: string;
  email: string;
  cin: string;
}

@Injectable({
  providedIn: 'root'
})
export class ObligatoireService {
  public baseUrl: string = 'http://localhost:3000/oblg'; // Corrected the base URL

  constructor(private http: HttpClient) { }

  // Create a new obligatoire entry
  createObligatoire(obligatoire: Obligatoire): Observable<Obligatoire> {
    return this.http.post<Obligatoire>(this.baseUrl, obligatoire)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Update an obligatoire entry
  updateObligatoire(obligatoire: Obligatoire): Observable<Obligatoire> {
    const url = `${this.baseUrl}/${obligatoire.id}`;
    return this.http.put<Obligatoire>(url, obligatoire)
      .pipe(
        catchError(this.handleError)
      );
  }
  

  // Delete an obligatoire entry
  deleteObligatoire(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Get all obligatoire entries
  getObligatoires(): Observable<Obligatoire[]> {
    const allObligatoiresUrl = `${this.baseUrl}/all`;
    return this.http.get<Obligatoire[]>(allObligatoiresUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Get an obligatoire entry by ID
  getObligatoireById(id: number): Observable<Obligatoire> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Obligatoire>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Error handling
  private handleError(error: any): Observable<any> {
    console.error('An error occurred:', error);
    return throwError(error.error || 'Server error');
  }
}
