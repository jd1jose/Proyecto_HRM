import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';

export interface PostulanteInformeItem {
  id: number;
  estadoAsignacion: string;
  postulanteId: number;
  vacancyId: number;
  postulante: {
    id: number;
    nombreCompleto: string | null;
    puestoSolicita: string | null;
    profesion: string | null;
    estado: string | null;
  } | null;
  vacante: {
    id: number;
    puesto: string | null;
    categoria: string | null;
    ciudad: string | null;
    estado: string | null;
  } | null;
}

export interface InformePayload {
  id?: number;
  postulanteId?: number | null;
  vacancyId?: number | null;
  estado?: 'borrador' | 'generado';
  generales?: Record<string, unknown> | null;
  familiares?: Record<string, unknown> | null;
  salud?: Record<string, unknown> | null;
  academico?: Record<string, unknown> | null;
  antecedentes?: Record<string, unknown> | null;
  laboral?: Record<string, unknown> | null;
  economico?: Record<string, unknown> | null;
  propiedades?: Record<string, unknown> | null;
  redes?: Record<string, unknown> | null;
  referencias?: Record<string, unknown> | null;
  entrevista?: Record<string, unknown> | null;
  anexos?: Record<string, unknown> | null;
}

export interface InformeResponse {
  id: number;
  estado: string;
}

export interface InformeDetalle extends InformePayload {
  id: number;
}

@Injectable({ providedIn: 'root' })
export class InformesService {
  private readonly vacanciesUrl = `${environment.apiUrl}/vacancies`;
  private readonly informesUrl = `${environment.apiUrl}/informes`;

  constructor(private http: HttpClient) {}

  obtenerPostulantesInforme(): Observable<PostulanteInformeItem[]> {
    return this.http
      .get<{ data: PostulanteInformeItem[] }>(`${this.vacanciesUrl}/postulantes/informe`)
      .pipe(map((response) => response.data ?? []));
  }

  guardarInforme(payload: InformePayload): Observable<InformeResponse> {
    const hasId = payload.id !== undefined && payload.id !== null;
    const request$ = hasId
      ? this.http.put<{ data: InformeResponse }>(
          `${this.informesUrl}/${payload.id}`,
          payload
        )
      : this.http.post<{ data: InformeResponse }>(`${this.informesUrl}`, payload);

    return request$.pipe(map((response) => response.data));
  }

  generarInforme(payload: InformePayload): Observable<InformeResponse> {
    return this.http
      .post<{ data: InformeResponse }>(`${this.informesUrl}/generar`, payload)
      .pipe(map((response) => response.data));
  }

  obtenerInforme(params: {
    informeId?: number | null;
    postulanteId?: number | null;
    vacancyId?: number | null;
  }): Observable<InformeDetalle | null> {
    const queryEntries = Object.entries(params ?? {}).filter(
      ([_key, value]) => value !== undefined && value !== null
    );

    if (queryEntries.length === 0) {
      return of(null);
    }

    let httpParams = new HttpParams();
    queryEntries.forEach(([key, value]) => {
      httpParams = httpParams.set(key, String(value));
    });

    return this.http
      .get<{ data: InformeDetalle | null }>(this.informesUrl, {
        params: httpParams
      })
      .pipe(map((response) => response.data ?? null));
  }
}
