import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RapportService {
  private baseUrl = 'http://localhost:3000/upload/rapport';

  constructor(private http: HttpClient) { }

  createRapport(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, data);
  }

 
  
  

  deleteRapport(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getAllRapports(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all`);
  }

  getRapportById(id: number): Observable<any> {
    return this.http.get(`http://localhost:3000/upload/rapport/${id}`, { responseType: 'blob' });
  }

  updateRapport(id: number, formData: FormData): Observable<any> {
    return this.http.put(`http://localhost:3000/upload/rapport/${id}`, formData);
  }
  getRapportDetailsById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}/details`);
}

  
  downloadRapport(rapportId: number) {
    return this.http.get(`${this.baseUrl}/${rapportId}/download`, { responseType: 'blob' });
  }
  private handleError(error: any) {
    let errorMessage = 'Unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
