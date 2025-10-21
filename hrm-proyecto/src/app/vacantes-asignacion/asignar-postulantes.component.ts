import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { VacantesService, Vacante } from '../services/vacantes.service';
import { PostulantesService, PostulanteResumen } from '../services/postulantes.service';

@Component({
  selector: 'app-asignar-postulantes',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './asignar-postulantes.component.html',
  styleUrls: ['./asignar-postulantes.component.css']
})
export class AsignarPostulantesComponent implements OnInit, OnDestroy {
  vacante?: Vacante;
  postulantes: PostulanteResumen[] = [];
  seleccionados = new Set<number>();
  loadingVacante = false;
  loadingPostulantes = false;
  guardando = false;
  error = '';
  postulantesError = '';
  mensajeExito = '';

  readonly estadoCivilOpciones = [
    { value: '', label: 'Todos' },
    { value: 'soltero', label: 'Soltero' },
    { value: 'casado', label: 'Casado' },
    { value: 'divorciado', label: 'Divorciado' },
    { value: 'viudo', label: 'Viudo' },
    { value: 'union-lib', label: 'Union de hecho' }
  ];

  filtrosForm: FormGroup;
  private readonly subscriptions = new Subscription();
  private vacanteId = 0;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly vacantesService: VacantesService,
    private readonly postulantesService: PostulantesService
  ) {
    this.filtrosForm = this.fb.group({
      search: [''],
      profesion: [''],
      estadoCivil: ['']
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);
    if (!Number.isInteger(id)) {
      this.error = 'Identificador de vacante invalido.';
      return;
    }
    this.vacanteId = id;
    this.cargarVacante();
    this.cargarPostulantes();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  cargarVacante(): void {
    this.loadingVacante = true;
    const sub = this.vacantesService.obtenerVacante(this.vacanteId).subscribe({
      next: (vacante) => {
        this.vacante = vacante;
        this.seleccionados = new Set(vacante.postulantes?.map((p) => p.id) || []);
      },
      error: (err) => {
        this.error = err?.error?.message || 'No se pudo cargar la informacion de la vacante.';
      },
      complete: () => {
        this.loadingVacante = false;
      }
    });
    this.subscriptions.add(sub);
  }

  cargarPostulantes(): void {
    if (!this.vacanteId) {
      return;
    }
    this.loadingPostulantes = true;
    this.postulantesError = '';
    const { search, profesion, estadoCivil } = this.filtrosForm.value;
    const sub = this.postulantesService
      .listarPostulantes({
        size: 25,
        search: search ?? '',
        profesion: profesion ?? '',
        estadoCivil: estadoCivil ?? ''
      })
      .subscribe({
        next: (respuesta) => {
          this.postulantes = respuesta.items;
        },
        error: (err) => {
          this.postulantesError =
            err?.error?.message || 'No se pudo obtener la lista de postulantes.';
        },
        complete: () => {
          this.loadingPostulantes = false;
        }
      });
    this.subscriptions.add(sub);
  }

  estaSeleccionado(id: number): boolean {
    return this.seleccionados.has(id);
  }

  toggleSeleccion(id: number, checked: boolean): void {
    if (checked) {
      this.seleccionados.add(id);
    } else {
      this.seleccionados.delete(id);
    }
  }

  postulanteTrackBy(_: number, postulante: PostulanteResumen): number {
    return postulante.id;
  }

  aplicarFiltros(): void {
    this.cargarPostulantes();
  }

  asignarPostulantes(): void {
    if (!this.vacanteId) {
      return;
    }
    this.guardando = true;
    this.mensajeExito = '';
    this.error = '';
    const ids = Array.from(this.seleccionados);
    const sub = this.vacantesService.asignarPostulantes(this.vacanteId, ids).subscribe({
      next: (vacanteActualizada) => {
        this.vacante = vacanteActualizada;
        this.seleccionados = new Set(vacanteActualizada.postulantes?.map((p) => p.id) || []);
        this.mensajeExito = 'Asignaciones actualizadas correctamente.';
      },
      error: (err) => {
        this.error =
          err?.error?.message || 'Ocurrio un error al intentar asignar los postulantes.';
      },
      complete: () => {
        this.guardando = false;
      }
    });
    this.subscriptions.add(sub);
  }

  volver(): void {
    this.router.navigate(['/bandeja/principal']);
  }
}
