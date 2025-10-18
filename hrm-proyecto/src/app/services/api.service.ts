import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // ✅ Endpoint de prueba
  getHealth(): Observable<any> {
    return this.http.get(`${this.baseUrl}/health`);
  }

  // 🔐 Autenticación
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, credentials);
  }

  // 👤 Usuarios
  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`);
  }

  // 💼 Vacantes
  getVacancies(): Observable<any> {
    return this.http.get(`${this.baseUrl}/vacancies`);
  }
}
