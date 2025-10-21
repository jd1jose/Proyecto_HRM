import { CommonModule } from '@angular/common';
import { Component, Type } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { AspectosGeneralesStepComponent } from './steps/aspectos-generales-step/aspectos-generales-step.component';
import { SaludStepComponent } from './steps/salud-step/salud-step.component';
import { DatosFamiliaresStepComponent } from './steps/datos-familiares-step/datos-familiares-step.component';
import { DatosAcademicosStepComponent } from './steps/datos-academicos-step/datos-academicos-step.component';
import { ReferenciasLaboralesStepComponent } from './steps/referencias-laborales-step/referencias-laborales-step.component';
import { ReferenciasPersonalesStepComponent } from './steps/referencias-personales-step/referencias-personales-step.component';
import { DatosEconomicosStepComponent } from './steps/datos-economicos-step/datos-economicos-step.component';
import { AspectosConsumoStepComponent } from './steps/aspectos-consumo-step/aspectos-consumo-step.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { PostulantesService, PostulantePayload } from '../services/postulantes.service';

interface StepDefinition {
  key: string;
  label: string;
  component: Type<unknown>;
}

@Component({
  selector: 'app-gestion-postulante',
  standalone: true,
  imports: [
    CommonModule,
    MatStepperModule,
    MatButtonModule,
    ReactiveFormsModule,
    AspectosGeneralesStepComponent,
    SaludStepComponent,
    DatosFamiliaresStepComponent,
    DatosAcademicosStepComponent,
    ReferenciasLaboralesStepComponent,
    ReferenciasPersonalesStepComponent,
    AspectosConsumoStepComponent,
    DatosEconomicosStepComponent
  ],
  templateUrl: './gestion-postulante.component.html',
  styleUrl: './gestion-postulante.component.css'
})
export class GestionPostulanteComponent {
  readonly generalForm: FormGroup;
  readonly saludForm: FormGroup;
  readonly familiaresForm: FormGroup;
  readonly academicosForm: FormGroup;
  readonly laboralesForm: FormGroup;
  readonly personalesForm: FormGroup;
  readonly economicosForm: FormGroup;
  readonly consumoForm: FormGroup;
  readonly postulanteForm: FormGroup;
  readonly steps: StepDefinition[];
  enviando = false;
  mensajeExito = '';
  mensajeError = '';

  constructor(
    private fb: FormBuilder,
    private postulantesService: PostulantesService
  ) {
    this.generalForm = this.fb.group({
      nombreCompleto: [''],
      puestoSolicita: [''],
      pretensionSalarial: [''],
      profesion: [''],
      lugarNacimiento: [''],
      fechaNacimiento: [''],
      edadActual: [''],
      estatura: [''],
      grupoSanguineo: [''],
      direccionCompleta: [''],
      telefonoContacto: [''],
      contactoEmergencia: [''],
      estadoCivil: [''],
      viveCon: [''],
      dependientes: [''],
      dpi: [''],
      nit: [''],
      igss: [''],
      irtra: [''],
      licenciaTipo: [''],
      documentoTrabajo: [''],
      medioTransporte: ['']
    });

    this.saludForm = this.fb.group({
      estadoSalud: [''],
      padecioCovid: [''],
      tieneVacunacionCovid: [''],
      numeroDosisCovid: [''],
      sufrioFracturas: [''],
      sufrioOperacion: [''],
      enfermedadCronica: [''],
      enfermaFrecuencia: [''],
      practicaDeportes: [''],
      perteneceClub: [''],
      tienePasatiempo: [''],
      metaVida: ['']
    });

    this.familiaresForm = this.fb.group({
      padreNombre: [''],
      padreEdad: [''],
      padreVive: [''],
      padreViveConUsted: [''],
      madreNombre: [''],
      madreEdad: [''],
      madreVive: [''],
      madreViveConUsted: [''],
      conyugeNombre: [''],
      conyugeEdad: [''],
      conyugeVive: [''],
      conyugeViveConUsted: [''],
      conyugeOcupacion: [''],
      hijosNombre: [''],
      hijosEdad: [''],
      hermanosNombre: [''],
      hermanosEdad: ['']
    });

    this.academicosForm = this.fb.group({
      primariaEstablecimiento: [''],
      primariaAnios: [''],
      basicosEstablecimiento: [''],
      basicosAnios: [''],
      diversificadoEstablecimiento: [''],
      diversificadoCarrera: [''],
      diversificadoAnios: [''],
      tecnicaEstablecimiento: [''],
      tecnicaCarrera: [''],
      tecnicaAnios: [''],
      universidadCuenta: [''],
      universidadDetalle: [''],
      postgradoCuenta: [''],
      postgradoDetalle: [''],
      idiomas: [''],
      software: [''],
      maquinas: [''],
      otrasFunciones: [''],
      experienciaLaboral: ['']
    });

    this.laboralesForm = this.fb.group({
      empresaNombre: [''],
      empresaDireccion: [''],
      empresaTelefono: [''],
      puestoDesempenado: [''],
      salarioDevengado: [''],
      fechaIngreso: [''],
      fechaSalida: [''],
      funciones: [''],
      jefeNombre: [''],
      jefePuesto: [''],
      motivoRetiro: [''],
      sePuedeReferenciar: ['']
    });

    this.personalesForm = this.fb.group({
      nombre: [''],
      telefono: [''],
      tiempoConocerlo: ['']
    });

    this.consumoForm = this.fb.group({
      tieneTatuajes: [''],
      bebe: [''],
      bebeFrecuencia: [''],
      fuma: [''],
      fumaFrecuencia: [''],
      puedeViajar: [''],
      cambiarResidencia: [''],
      afiliadoSindicato: [''],
      consumioDrogas: [''],
      tieneAntecedentes: [''],
      fechaDisponibilidad: [''],
      religion: ['']
    });

    this.economicosForm = this.fb.group({
      otrosIngresos: [''],
      descripcionIngresos: [''],
      conyugeTrabaja: [''],
      casaPropia: [''],
      pagaRenta: [''],
      tieneDeudas: [''],
      deudaCobroJudicial: [''],
      abonoMensual: ['']
    });

    this.postulanteForm = this.fb.group({
      generales: this.generalForm,
      salud: this.saludForm,
      familiares: this.familiaresForm,
      academicos: this.academicosForm,
      laborales: this.laboralesForm,
      personales: this.personalesForm,
      consumo: this.consumoForm,
      economicos: this.economicosForm
    });

    this.steps = [
      { key: 'generales', label: 'Aspectos Generales', component: AspectosGeneralesStepComponent },
      { key: 'salud', label: 'Salud', component: SaludStepComponent },
      { key: 'familiares', label: 'Datos Familiares', component: DatosFamiliaresStepComponent },
      { key: 'academicos', label: 'Datos Academicos', component: DatosAcademicosStepComponent },
      { key: 'laborales', label: 'Referencias Laborales', component: ReferenciasLaboralesStepComponent },
      { key: 'personales', label: 'Referencias Personales', component: ReferenciasPersonalesStepComponent },
      { key: 'consumo', label: 'Aspectos de Consumo', component: AspectosConsumoStepComponent },
      { key: 'economicos', label: 'Datos Economicos', component: DatosEconomicosStepComponent }
    ];
  }

  onSubmit(): void {
    if (this.postulanteForm.invalid) {
      this.postulanteForm.markAllAsTouched();
      this.mensajeError = 'Por favor complete la información pendiente antes de enviar.';
      return;
    }

    const payload = this.postulanteForm.value as PostulantePayload;
    this.enviando = true;
    this.mensajeError = '';
    this.mensajeExito = '';

    this.postulantesService
      .registrarPostulante(payload)
      .pipe(finalize(() => (this.enviando = false)))
      .subscribe({
        next: () => {
          this.mensajeExito = 'Postulante registrado correctamente.';
        },
        error: (err) => {
          this.mensajeError = err?.error?.message || 'No se pudo registrar el postulante. Inténtelo de nuevo.';
        }
      });
  }
}
