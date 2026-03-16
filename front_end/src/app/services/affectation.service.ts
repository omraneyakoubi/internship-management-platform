import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Interface for affectation entry
export interface Affectation {
  id: number;
  nomsociete: string;
  sujet: string;
  adresse: string;
  numrsociete: string;
  nomencadreurtechnique: string;
  emailetud: string;
}

@Injectable({
  providedIn: 'root'
})
export class AffectationService {
  forEach(arg0: (depot: any, index: any) => void) {
    throw new Error('Method not implemented.');
  }
  private baseUrl: string = 'http://localhost:3000/affectation';

  constructor(private http: HttpClient) { }

  // Create a new affectation entry
  createAffectation(affectation: Affectation): Observable<any> {
    const url = `${this.baseUrl}/add`;
    return this.http.post(url, affectation)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Update an affectation entry
  updateAffectation(id: number, affectation: Affectation): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put(url, affectation)
      .pipe(catchError(this.handleError));
  }

  // Delete an affectation entry
  deleteAffectation(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Get all affectation entries
  getAffectations(): Observable<Affectation[]> {
    const url = `${this.baseUrl}/all`;
    return this.http.get<Affectation[]>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Get an affectation entry by ID
  getAffectationById(id: number): Observable<Affectation> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Affectation>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  sendMail(reqObj: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  
    return this.http.post<any>('http://localhost:3000/emailaffectation', reqObj, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 200 && error.error) {
          console.error('Error sending email:', error.error);
          return throwError(error.error.message || 'Failed to send email');
        } else {
          console.error('Error sending email:', error);
          return throwError('Failed to send email');
        }
      })
    );
  }

  // Error handling
  private handleError(error: any): Observable<any> {
    console.error('An error occurred:', error);
    return throwError(error.error || 'Server error');
  }
}
