import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { VacantesService, VacantePayload } from '../services/vacantes.service';

@Component({
  selector: 'app-gestion-vacante',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './gestion-vacante.component.html'
})
export class GestionVacanteComponent implements OnInit {
  vacanteForm!: FormGroup;

  categorias = [
    'Administracion',
    'Tecnologia',
    'Ventas y Marketing',
    'Recursos Humanos',
    'Finanzas y Contabilidad',
    'Logistica y Operaciones',
    'Servicio al Cliente',
    'Salud',
    'Educacion',
    'Ingenieria',
    'Produccion y Manufactura',
    'Legal'
  ];

  tiposContrato = ['Tiempo Completo', 'Medio Tiempo', 'Temporal', 'Practicas', 'Por proyecto'];
  experiencia = ['Sin experiencia', '1-2 anos', '3-5 anos', 'Mas de 5 anos'];
  educacion = ['Secundaria', 'Tecnico', 'Universitario', 'Postgrado', 'Doctorado'];
  departamentos = [
    'Guatemala',
    'El Progreso',
    'Sacatepequez',
    'Chimaltenango',
    'Escuintla',
    'Santa Rosa',
    'Solola',
    'Totonicapan',
    'Quetzaltenango',
    'Suchitepequez',
    'Retalhuleu',
    'San Marcos',
    'Huehuetenango',
    'Quiche',
    'Baja Verapaz',
    'Alta Verapaz',
    'Peten',
    'Izabal',
    'Zacapa',
    'Chiquimula',
    'Jalapa',
    'Jutiapa'
  ];

  ciudades = ['Ciudad de Guatemala', 'Antigua', 'Quetzaltenango', 'Coban', 'Puerto Barrios'];
  tipoPago = ['Mensual', 'Quincenal', 'Por hora'];

  guardando = false;
  mensajeExito = '';
  mensajeError = '';
  vacanteEnEdicion: number | null = null;

  constructor(private fb: FormBuilder, private vacantesService: VacantesService) {}

  ngOnInit(): void {
    this.vacanteForm = this.fb.group({
      puesto: ['', Validators.required],
      descripcion: ['', Validators.required],
      contacto: ['', [Validators.required, Validators.email]],
      categoria: ['', Validators.required],
      tipoContrato: ['', Validators.required],
      experiencia: ['', Validators.required],
      educacion: ['', Validators.required],
      departamento: ['', Validators.required],
      ciudad: ['', Validators.required],
      cantidadVacantes: [1, [Validators.required, Validators.min(1)]],
      salario: ['', [Validators.required, Validators.min(0)]],
      tipoPago: ['', Validators.required]
    });
  }

  guardar(): void {
    if (!this.vacanteForm.valid) {
      this.vacanteForm.markAllAsTouched();
      this.mensajeError = 'Por favor complete todos los campos obligatorios antes de guardar.';
      return;
    }

    this.guardarVacante();
  }

  private guardarVacante(): void {
    const payload = this.construirPayload();

    this.guardando = true;
    this.mensajeError = '';
    this.mensajeExito = '';

    const request$ = this.vacanteEnEdicion
      ? this.vacantesService.actualizarVacante(this.vacanteEnEdicion, payload)
      : this.vacantesService.crearVacante(payload);

    request$
      .pipe(finalize(() => (this.guardando = false)))
      .subscribe({
        next: () => {
          this.mensajeExito = this.vacanteEnEdicion
            ? 'Vacante actualizada correctamente.'
            : 'Vacante registrada correctamente.';
          this.vacanteForm.reset({ cantidadVacantes: 1 });
          this.vacanteEnEdicion = null;
        },
        error: (err) => {
          const detalle = err?.error?.message || 'Ocurrio un error al intentar guardar la vacante.';
          this.mensajeError = detalle;
        }
      });
  }

  private construirPayload(): VacantePayload {
    const raw = this.vacanteForm.value;
    const payload: VacantePayload = {
      puesto: (raw.puesto || '').trim(),
      descripcion: (raw.descripcion || '').trim(),
      contacto: (raw.contacto || '').trim(),
      categoria: raw.categoria,
      tipoContrato: raw.tipoContrato,
      experiencia: raw.experiencia,
      educacion: raw.educacion,
      departamento: raw.departamento,
      ciudad: raw.ciudad,
      cantidadVacantes: Number(raw.cantidadVacantes) || 1,
      salario: Number(raw.salario),
      tipoPago: raw.tipoPago
    };

    if (!this.vacanteEnEdicion) {
      payload.estado = 'abierta';
    }

    return payload;
  }
}
