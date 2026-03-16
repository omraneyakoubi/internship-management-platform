import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, catchError, tap, map, throwError } from 'rxjs';

export interface User {
  id?: number;
  cin: string;
  nom: string;
  prenom: string;
  email: string;
  etablissement: string;
  mdp: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public baseUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  register(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }
  login(email: string, mdp: string): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.baseUrl}/login`, { email, mdp }, { observe: 'response' }).pipe(
      catchError((error: any) => {
        console.error('Login error:', error);
        throw error;
      }),
      tap((response: HttpResponse<any>) => {
        const token = response.body?.token;
        if (token) {
          localStorage.setItem('token', token);
        }
      })
    );
  }
  
  

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return token !== null;
  }

  checkEmailExists(email: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/check-email/${email}`);
  }

  updateUser(id: number, userData: User): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, userData);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all`);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  sendMail(reqObj: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  
    return this.http.post<any>(`http://localhost:3000/emailuser`, reqObj, { headers });
  }
}
