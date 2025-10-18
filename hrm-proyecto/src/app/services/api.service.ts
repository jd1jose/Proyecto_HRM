import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Endpoint de prueba
  getHealth(): Observable<any> {
    return this.http.get(`${this.baseUrl}/health`);
  }

  // Autenticación
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, credentials);
  }

  // Usuarios (evitar cache con parámetro timestamp)
  getUsers(): Observable<any> {
    const url = `${this.baseUrl}/users?ts=${Date.now()}`;
    return this.http.get(url);
  }

  // Crear usuario en backend
  createUser(payload: {
    full_name: string;
    email: string;
    password: string;
    role: string;
    user_type: 'temporal' | 'fijo';
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, payload);
  }

  // Vacantes
  getVacancies(): Observable<any> {
    return this.http.get(`${this.baseUrl}/vacancies`);
  }
}
