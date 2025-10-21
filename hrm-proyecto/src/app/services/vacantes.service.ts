import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export type EstadoVacante =
  | 'abierta'
  | 'cerrada'
  | 'en_proceso'
  | 'confirmar_postulantes'
  | 'informe_riesgo';

interface ApiResponse<T> {
  message: string;
  data: T;
}

export interface VacantePayload {
  puesto: string;
  descripcion: string;
  contacto: string;
  categoria: string;
  tipoContrato: string;
  experiencia: string;
  educacion: string;
  departamento: string;
  ciudad: string;
  cantidadVacantes: number;
  salario: number;
  tipoPago: string;
  estado?: EstadoVacante;
}

export interface VacantePostulante {
  id: number;
  estado?: string;
  nombreCompleto?: string;
  puestoSolicita?: string;
  profesion?: string;
  telefonoContacto?: string;
}

export interface Vacante extends VacantePayload {
  id: number;
  estado: EstadoVacante;
  createdAt?: string;
  updatedAt?: string;
  postulantes?: VacantePostulante[];
}

export interface VacantesResponse {
  items: Vacante[];
  total: number;
  page: number;
  size: number;
}

@Injectable({ providedIn: 'root' })
export class VacantesService {
  private readonly baseUrl = `${environment.apiUrl}/vacancies`;

  constructor(private http: HttpClient) {}

  listarVacantes(params?: {
    page?: number;
    size?: number;
    estado?: EstadoVacante;
  }): Observable<VacantesResponse> {
    let httpParams = new HttpParams();
    if (params?.page) httpParams = httpParams.set('page', params.page.toString());
    if (params?.size) httpParams = httpParams.set('size', params.size.toString());
    if (params?.estado) httpParams = httpParams.set('status', params.estado);
    return this.http
      .get<ApiResponse<VacantesResponse>>(this.baseUrl, { params: httpParams })
      .pipe(map((response) => response.data));
  }

  obtenerVacante(id: number): Observable<Vacante> {
    return this.http
      .get<ApiResponse<Vacante>>(`${this.baseUrl}/${id}`)
      .pipe(map((response) => response.data));
  }

  crearVacante(payload: VacantePayload): Observable<Vacante> {
    return this.http
      .post<ApiResponse<Vacante>>(this.baseUrl, payload)
      .pipe(map((response) => response.data));
  }

  actualizarVacante(id: number, payload: VacantePayload): Observable<Vacante> {
    return this.http
      .put<ApiResponse<Vacante>>(`${this.baseUrl}/${id}`, payload)
      .pipe(map((response) => response.data));
  }

  asignarPostulantes(id: number, postulanteIds: number[]): Observable<Vacante> {
    return this.http
      .post<ApiResponse<Vacante>>(`${this.baseUrl}/${id}/asignaciones`, { postulanteIds })
      .pipe(map((response) => response.data));
  }

  cerrarVacante(id: number): Observable<Vacante> {
    return this.http
      .post<ApiResponse<Vacante>>(`${this.baseUrl}/${id}/cerrar`, {})
      .pipe(map((response) => response.data));
  }

  generarInformeRiesgo(id: number, postulanteIds: number[]): Observable<Vacante> {
    return this.http
      .post<ApiResponse<Vacante>>(`${this.baseUrl}/${id}/informe-riesgo`, { postulanteIds })
      .pipe(map((response) => response.data));
  }
}
