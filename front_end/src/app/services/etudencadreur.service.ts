// etudencadreur.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Etudencadreur {
  id: number;
  nomet: string;
  emailetud: string;
  encadreur: string;
  sujet: string;
}

@Injectable({
  providedIn: 'root'
})
export class EtudencadreurService {

  private baseUrl = 'http://localhost:3000/etudencadrent';

  constructor(private http: HttpClient) { }

  // Create a new etudencadreur entry
  createEtudencadreur(etudencadreurData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, etudencadreurData);
  }

  // Update etudencadreur by ID
  updateEtudencadreur(id: number, etudencadreurData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${id}`, etudencadreurData);
  }

  // Delete etudencadreur by ID
  deleteEtudencadreur(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }

  // Get all etudencadreur entries
  getAllEtudencadreurs(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all`);
  }

  // Get etudencadreur entry by ID
  getEtudencadreurById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/get/${id}`);
  }
}
