import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { InformesService, PostulanteInformeItem } from '../services/informes.service';

@Component({
  selector: 'app-postulantes-informe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './postulantes-informe.component.html',
  styleUrls: ['./postulantes-informe.component.css']
})
export class PostulantesInformeComponent {
  private readonly informesService = inject(InformesService);
  private readonly router = inject(Router);

  readonly postulantes = signal<PostulanteInformeItem[]>([]);
  readonly cargando = signal(false);
  readonly error = signal('');

  constructor() {
    this.cargarPostulantes();
  }

  cargarPostulantes(): void {
    this.cargando.set(true);
    this.error.set('');

    this.informesService
      .obtenerPostulantesInforme()
      .pipe(finalize(() => this.cargando.set(false)))
      .subscribe({
        next: (items) => this.postulantes.set(items),
        error: (err) => {
          const message = err?.error?.message || 'No se pudieron cargar los postulantes para informe.';
          this.error.set(message);
        }
      });
  }

  trackByAsignacion(_index: number, item: PostulanteInformeItem): number {
    return item.id;
  }

  irAGestionInformes(item?: PostulanteInformeItem): void {
    const extras = item
      ? { queryParams: { postulanteId: item.postulanteId, vacancyId: item.vacancyId } }
      : undefined;
    this.router.navigate(['/informes'], extras);
  }
}
