import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {
  VacantesService,
  Vacante,
  EstadoVacante,
  VacantePostulante
} from '../services/vacantes.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  vacantes: Vacante[] = [];
  loading = false;
  error = '';
  accionMensaje = '';
  accionError = '';
  accionEnProgresoId: number | null = null;
  menuAccionesAbiertoId: number | null = null;
  menuAccionesEstilos: { top: string; left: string } = { top: '0px', left: '0px' };

  modalAbierto = false;
  modalCargando = false;
  modalError = '';
  vacanteModal?: Vacante;
  postulantesModal: VacantePostulante[] = [];
  seleccionInforme = new Set<number>();

  constructor(private vacantesService: VacantesService, private router: Router) {}

  ngOnInit(): void {
    this.cargarVacantes();
  }

  cargarVacantes(): void {
    this.loading = true;
    this.error = '';
    this.vacantesService
      .listarVacantes({ size: 20 })
      .subscribe({
        next: (respuesta) => {
          this.vacantes = respuesta.items;
        },
        error: (err) => {
          this.error = err?.error?.message || 'No se pudieron cargar las vacantes disponibles.';
        },
        complete: () => {
          this.loading = false;
        }
      });
  }

  irAAsignacion(vacante: Vacante): void {
    this.cerrarMenuAcciones();
    this.router.navigate(['/vacantes', vacante.id, 'asignaciones']);
  }

  cerrarAsignacion(vacante: Vacante): void {
    this.cerrarMenuAcciones();
    if (this.accionEnProgresoId !== null) {
      return;
    }
    this.accionMensaje = '';
    this.accionError = '';
    this.accionEnProgresoId = vacante.id;
    this.vacantesService.cerrarVacante(vacante.id).subscribe({
      next: (vacanteActualizada) => {
        this.reemplazarVacante(vacanteActualizada);
        this.accionMensaje = 'La asignacion se cerro y la vacante paso a confirmar postulantes.';
      },
      error: (err) => {
        this.accionError =
          err?.error?.message || 'No se pudo cerrar la vacante. Intente nuevamente.';
        this.accionEnProgresoId = null;
      },
      complete: () => {
        this.accionEnProgresoId = null;
      }
    });
  }

  abrirModalInforme(vacante: Vacante): void {
    this.cerrarMenuAcciones();
    if (this.accionEnProgresoId !== null) {
      return;
    }
    this.modalAbierto = true;
    this.modalCargando = true;
    this.modalError = '';
    this.vacanteModal = undefined;
    this.postulantesModal = [];
    this.seleccionInforme.clear();

    this.vacantesService.obtenerVacante(vacante.id).subscribe({
      next: (detalle) => {
        this.vacanteModal = detalle;
        const postulantes = (detalle.postulantes || []).filter((postulante) =>
          ['seleccionado', 'generar_informe'].includes(postulante.estado ?? '')
        );
        this.postulantesModal = postulantes;
        postulantes
          .filter((postulante) => postulante.estado === 'generar_informe')
          .forEach((postulante) => this.seleccionInforme.add(postulante.id));
      },
      error: (err) => {
        this.modalError =
          err?.error?.message || 'No se pudo cargar la informacion de la vacante.';
        this.modalCargando = false;
      },
      complete: () => {
        this.modalCargando = false;
      }
    });
  }

  toggleSeleccionInforme(postulanteId: number, seleccionado: boolean): void {
    if (seleccionado) {
      this.seleccionInforme.add(postulanteId);
    } else {
      this.seleccionInforme.delete(postulanteId);
    }
  }

  confirmarInforme(): void {
    if (!this.vacanteModal) {
      return;
    }
    if (this.seleccionInforme.size === 0) {
      this.modalError = 'Seleccione al menos un postulante para generar el informe.';
      return;
    }
    this.modalError = '';
    this.accionMensaje = '';
    this.accionError = '';
    this.accionEnProgresoId = this.vacanteModal.id;
    const ids = Array.from(this.seleccionInforme);
    this.vacantesService.generarInformeRiesgo(this.vacanteModal.id, ids).subscribe({
      next: (vacanteActualizada) => {
        this.reemplazarVacante(vacanteActualizada);
        this.accionMensaje = 'Postulantes marcados para el informe de riesgo.';
        this.cerrarModal();
      },
      error: (err) => {
        this.accionError =
          err?.error?.message || 'No se pudo preparar el informe de riesgo.';
        this.modalError =
          err?.error?.message || 'No se pudo preparar el informe de riesgo.';
        this.accionEnProgresoId = null;
      },
      complete: () => {
        this.accionEnProgresoId = null;
      }
    });
  }

  cerrarModal(): void {
    this.modalAbierto = false;
    this.modalCargando = false;
    this.modalError = '';
    this.vacanteModal = undefined;
    this.postulantesModal = [];
    this.seleccionInforme.clear();
  }

  estadoEtiqueta(estado: EstadoVacante): string {
    const etiquetas: Record<string, string> = {
      confirmar_postulantes: 'Confirmar postulantes',
      informe_riesgo: 'Informe de riesgo',
      en_proceso: 'En proceso',
      abierta: 'Abierta',
      cerrada: 'Cerrada'
    };
    return etiquetas[estado] ?? estado;
  }

  estadoClase(estado: EstadoVacante): string {
    switch (estado) {
      case 'abierta':
        return 'bg-green-100 text-green-800';
      case 'en_proceso':
        return 'bg-blue-100 text-blue-800';
      case 'confirmar_postulantes':
        return 'bg-orange-100 text-orange-800';
      case 'informe_riesgo':
        return 'bg-purple-100 text-purple-800';
      case 'cerrada':
      default:
        return 'bg-gray-200 text-gray-600';
    }
  }

  private reemplazarVacante(vacanteActualizada: Vacante): void {
    this.vacantes = this.vacantes.map((vacante) =>
      vacante.id === vacanteActualizada.id ? vacanteActualizada : vacante
    );
  }

  postulanteTrackFn(_: number, postulante: VacantePostulante): number {
    return postulante.id;
  }

  toggleMenuAcciones(event: MouseEvent, vacanteId: number): void {
    event.stopPropagation();
    if (this.menuAccionesAbiertoId === vacanteId) {
      this.cerrarMenuAcciones();
      return;
    }
    const boton = event.currentTarget as HTMLElement;
    const rect = boton.getBoundingClientRect();
    this.menuAccionesEstilos = {
      top: `${rect.bottom + window.scrollY + 8}px`,
      left: `${rect.right + window.scrollX}px`
    };
    this.menuAccionesAbiertoId = vacanteId;
  }

  cerrarVacante(vacante: Vacante): void {
    this.cerrarMenuAcciones();
    if (this.accionEnProgresoId !== null) {
      return;
    }
    this.accionMensaje = '';
    this.accionError = '';
    this.accionEnProgresoId = vacante.id;
    this.vacantesService.actualizarEstadoVacante(vacante.id, 'cerrada').subscribe({
      next: (vacanteActualizada) => {
        this.reemplazarVacante(vacanteActualizada);
        this.accionMensaje = 'La vacante se cerro definitivamente.';
      },
      error: (err) => {
        this.accionError =
          err?.error?.message || 'No se pudo cerrar la vacante. Intente nuevamente.';
        this.accionEnProgresoId = null;
      },
      complete: () => {
        this.accionEnProgresoId = null;
      }
    });
  }

  cerrarMenuAcciones(): void {
    this.menuAccionesAbiertoId = null;
    this.menuAccionesEstilos = { top: '0px', left: '0px' };
  }

  @HostListener('document:click')
  onDocumentClick(): void {
    this.cerrarMenuAcciones();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.cerrarMenuAcciones();
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    this.cerrarMenuAcciones();
  }
}
