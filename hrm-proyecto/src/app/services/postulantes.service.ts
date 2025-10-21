import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

type TextValue = string | null;
type NumericValue = string | number | null;
type BooleanValue = boolean | '' | null;

interface ApiResponse<T> {
  message: string;
  data: T;
}

export interface PostulanteGeneralesPayload {
  nombreCompleto: TextValue;
  puestoSolicita: TextValue;
  pretensionSalarial: TextValue;
  profesion: TextValue;
  lugarNacimiento: TextValue;
  fechaNacimiento: TextValue;
  edadActual: NumericValue;
  estatura: TextValue;
  grupoSanguineo: TextValue;
  direccionCompleta: TextValue;
  telefonoContacto: TextValue;
  contactoEmergencia: TextValue;
  estadoCivil: TextValue;
  viveCon: TextValue;
  dependientes: TextValue;
  dpi: TextValue;
  nit: TextValue;
  igss: TextValue;
  irtra: TextValue;
  licenciaTipo: TextValue;
  documentoTrabajo: TextValue;
  medioTransporte: TextValue;
}

export interface PostulanteSaludPayload {
  estadoSalud: TextValue;
  padecioCovid: BooleanValue;
  tieneVacunacionCovid: BooleanValue;
  numeroDosisCovid: NumericValue;
  sufrioFracturas: BooleanValue;
  sufrioOperacion: BooleanValue;
  enfermedadCronica: BooleanValue;
  enfermaFrecuencia: BooleanValue;
  practicaDeportes: BooleanValue;
  perteneceClub: BooleanValue;
  tienePasatiempo: BooleanValue;
  metaVida: BooleanValue;
}

export interface PostulanteFamiliaresPayload {
  padreNombre: TextValue;
  padreEdad: NumericValue;
  padreVive: BooleanValue;
  padreViveConUsted: BooleanValue;
  madreNombre: TextValue;
  madreEdad: NumericValue;
  madreVive: BooleanValue;
  madreViveConUsted: BooleanValue;
  conyugeNombre: TextValue;
  conyugeEdad: NumericValue;
  conyugeVive: BooleanValue;
  conyugeViveConUsted: BooleanValue;
  conyugeOcupacion: TextValue;
  hijosNombre: TextValue;
  hijosEdad: NumericValue;
  hermanosNombre: TextValue;
  hermanosEdad: NumericValue;
}

export interface PostulanteAcademicosPayload {
  primariaEstablecimiento: TextValue;
  primariaAnios: TextValue;
  basicosEstablecimiento: TextValue;
  basicosAnios: TextValue;
  diversificadoEstablecimiento: TextValue;
  diversificadoCarrera: TextValue;
  diversificadoAnios: TextValue;
  tecnicaEstablecimiento: TextValue;
  tecnicaCarrera: TextValue;
  tecnicaAnios: TextValue;
  universidadCuenta: BooleanValue;
  universidadDetalle: TextValue;
  postgradoCuenta: BooleanValue;
  postgradoDetalle: TextValue;
  idiomas: TextValue;
  software: TextValue;
  maquinas: TextValue;
  otrasFunciones: TextValue;
  experienciaLaboral: BooleanValue;
}

export interface PostulanteLaboralesPayload {
  empresaNombre: TextValue;
  empresaDireccion: TextValue;
  empresaTelefono: TextValue;
  puestoDesempenado: TextValue;
  salarioDevengado: TextValue;
  fechaIngreso: TextValue;
  fechaSalida: TextValue;
  funciones: TextValue;
  jefeNombre: TextValue;
  jefePuesto: TextValue;
  motivoRetiro: TextValue;
  sePuedeReferenciar: BooleanValue;
}

export interface PostulantePersonalesPayload {
  nombre: TextValue;
  telefono: TextValue;
  tiempoConocerlo: TextValue;
}

export interface PostulanteConsumoPayload {
  tieneTatuajes: TextValue;
  bebe: BooleanValue;
  bebeFrecuencia: TextValue;
  fuma: BooleanValue;
  fumaFrecuencia: TextValue;
  puedeViajar: BooleanValue;
  cambiarResidencia: BooleanValue;
  afiliadoSindicato: BooleanValue;
  consumioDrogas: BooleanValue;
  tieneAntecedentes: BooleanValue;
  fechaDisponibilidad: TextValue;
  religion: TextValue;
}

export interface PostulanteEconomicosPayload {
  otrosIngresos: BooleanValue;
  descripcionIngresos: TextValue;
  conyugeTrabaja: BooleanValue;
  casaPropia: BooleanValue;
  pagaRenta: BooleanValue;
  tieneDeudas: BooleanValue;
  deudaCobroJudicial: BooleanValue;
  abonoMensual: TextValue;
}

export interface PostulanteResumen {
  id: number;
  estado: string;
  generales: PostulanteGeneralesPayload;
  salud: PostulanteSaludPayload | null;
  familiares: PostulanteFamiliaresPayload | null;
  academicos: PostulanteAcademicosPayload | null;
  laborales: PostulanteLaboralesPayload | null;
  personales: PostulantePersonalesPayload | null;
  consumo: PostulanteConsumoPayload | null;
  economicos: PostulanteEconomicosPayload | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface PostulantesResponse {
  items: PostulanteResumen[];
  total: number;
  page: number;
  size: number;
}

export interface PostulantePayload {
  generales: PostulanteGeneralesPayload;
  salud: PostulanteSaludPayload;
  familiares: PostulanteFamiliaresPayload;
  academicos: PostulanteAcademicosPayload;
  laborales: PostulanteLaboralesPayload;
  personales: PostulantePersonalesPayload;
  consumo: PostulanteConsumoPayload;
  economicos: PostulanteEconomicosPayload;
}

@Injectable({ providedIn: 'root' })
export class PostulantesService {
  private readonly baseUrl = `${environment.apiUrl}/postulantes`;

  constructor(private http: HttpClient) {}

  listarPostulantes(params?: {
    page?: number;
    size?: number;
    search?: string;
    profesion?: string;
    estadoCivil?: string;
  }): Observable<PostulantesResponse> {
    let httpParams = new HttpParams();
    if (params?.page !== undefined) httpParams = httpParams.set('page', params.page.toString());
    if (params?.size !== undefined) httpParams = httpParams.set('size', params.size.toString());
    if (params?.search) httpParams = httpParams.set('search', params.search);
    if (params?.profesion) httpParams = httpParams.set('profesion', params.profesion);
    if (params?.estadoCivil) httpParams = httpParams.set('estadoCivil', params.estadoCivil);

    return this.http
      .get<ApiResponse<PostulantesResponse>>(this.baseUrl, { params: httpParams })
      .pipe(map((response) => response.data));
  }

  registrarPostulante(payload: PostulantePayload): Observable<any> {
    return this.http.post(this.baseUrl, payload);
  }
}
