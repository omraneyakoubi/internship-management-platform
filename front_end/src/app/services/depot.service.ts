import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Interface for depot entry
export interface Depot {
  id: number;
  cin: string;
  nomprenom: string;
  inscri: string;
  diplome: string;
  spec: string;
  annee: string;
}

@Injectable({
  providedIn: 'root'
})
export class DepotService {
  private baseUrl: string = 'http://localhost:3000/depot';

  constructor(private http: HttpClient) { }

  // Create a new depot entry
  createDepot(depot: Depot): Observable<any> {
    const url = `${this.baseUrl}/add`;
    return this.http.post(url, depot)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Update a depot entry
  updateDepot(depot: Depot): Observable<any> {
    const url = `${this.baseUrl}/update/${depot.id}`;
    return this.http.put(url, depot)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Delete a depot entry
  deleteDepot(id: number): Observable<any> {
    const url = `${this.baseUrl}/delete/${id}`;
    return this.http.delete(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Get all depot entries
  getDepots(): Observable<Depot[]> {
    const url = `${this.baseUrl}/all`;
    return this.http.get<Depot[]>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Get a depot entry by ID
  getDepotById(id: number): Observable<Depot> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Depot>(url)
      .pipe(
        catchError(this.handleError)
      );
  }
  sendMail(reqObj: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  
    return this.http.post<any>('http://localhost:3000/emaildemmandedestage', reqObj, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 200 && error.error) {
          // If the status is 200 but there's an error in the response body
          console.error('Error sending email:', error.error);
          return throwError(error.error.message || 'Failed to send email');
        } else {
          // For other error cases, just throw the error
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
