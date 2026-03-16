import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanningService {

  private baseUrl = 'http://localhost:3000/planning/planning'; // Assuming your backend runs on localhost port 3000

  constructor(private http: HttpClient) { }

  // Create a new planning entry
  createPlanningEntry(email: string, date: string, fedback: string): Observable<any> {
    const body = { email, date, fedback };
    return this.http.post(`${this.baseUrl}`, body);
  }

  // Update a planning entry by ID
  updatePlanningEntry(id: number, email: string, date: string, fedback: string): Observable<any> {
    const body = { email, date, fedback };
    return this.http.put(`${this.baseUrl}/${id}`, body);
  }

  // Delete a planning entry by ID
  deletePlanningEntry(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  // Get all planning entries
  getAllPlanningEntries(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all`);
  }

  // Get a planning entry by ID
  getPlanningEntryById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }



  getPlanningEntriesByEmail(email: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/email/${email}`);
  }
// Send email
sendMail(reqObj: any): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  return this.http.post<any>('http://localhost:3000/emailplanning', reqObj, { headers }).pipe(
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


}
