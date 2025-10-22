import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { InformesService, InformePayload, InformeDetalle } from '../services/informes.service';
import { InformacionGeneralComponent } from './steep/informacion-general/informacion-general.component';
import { DatosFamiliaresComponent } from './steep/datos-familiares/datos-familiares.component';
import { SaludComponent } from './steep/salud/salud.component';
import { HistorialAcademicoComponent } from './steep/historial-academico/historial-academico.component';
import { AntecedentesComponent } from './steep/antecedentes/antecedentes.component';
import { InformacionLaboralComponent } from './steep/informacion-laboral/informacion-laboral.component';
import { InformacionEconomicaComponent } from './steep/informacion-economica/informacion-economica.component';
import { ViviendaComponent } from './steep/vivienda/vivienda.component';
import { RedesComponent } from './steep/redes/redes.component';
import { ReferenciaComponent } from './steep/referencia/referencia.component';
import { EntrevistaComponent } from './steep/entrevista/entrevista.component';
import { FotografiasComponent } from './steep/fotografias/fotografias.component';
import { InformePdfService } from './informe-pdf.service';
import { InformePdfPreviewDialogComponent } from './informe-pdf-preview-dialog.component';
import { environment } from '../../environments/environment';

type InformeEstado = 'borrador' | 'generado';
type InformeSectionKeys = Exclude<keyof InformePayload, 'id' | 'postulanteId' | 'vacancyId' | 'estado'>;
type InformeSanitizedSections = Partial<Record<InformeSectionKeys, Record<string, unknown> | null>>;

@Component({
  selector: 'app-gestion-informes',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    RouterModule,
    MatDialogModule,
    InformacionGeneralComponent,
    DatosFamiliaresComponent,
    SaludComponent,
    HistorialAcademicoComponent,
    AntecedentesComponent,
    InformacionLaboralComponent,
    InformacionEconomicaComponent,
    ViviendaComponent,
    RedesComponent,
    ReferenciaComponent,
    EntrevistaComponent,
    FotografiasComponent,
    InformePdfPreviewDialogComponent
  ],
  templateUrl: './gestion-informes.component.html',
  styleUrls: ['./gestion-informes.component.css']
})
export class GestionInformesComponent implements OnInit, AfterViewInit {
  form!: FormGroup;
  isSaving = false;
  isGenerating = false;
  informeId: number | null = null;
  postulanteId: number | null = null;
  vacancyId: number | null = null;
  private readonly filesBaseUrl = environment.apiUrl.replace(/\/api$/, '');

  constructor(
    private readonly fb: FormBuilder,
    private readonly informesService: InformesService,
    private readonly route: ActivatedRoute,
    private readonly pdfService: InformePdfService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      generales: this.fb.group({}),
      familiares: this.fb.group({}),
      salud: this.fb.group({}),
      academico: this.fb.group({}),
      antecedentes: this.fb.group({}),
      laboral: this.fb.group({}),
      economico: this.fb.group({}),
      propiedades: this.fb.group({}),
      redes: this.fb.group({}),
      referencias: this.fb.group({}),
      entrevista: this.fb.group({}),
      anexos: this.fb.group({})
    });

    const params = this.route.snapshot.queryParamMap;
    const postulanteParam = params.get('postulanteId');
    const vacancyParam = params.get('vacancyId');
    this.postulanteId =
      postulanteParam && !Number.isNaN(Number(postulanteParam)) ? Number(postulanteParam) : null;
    this.vacancyId =
      vacancyParam && !Number.isNaN(Number(vacancyParam)) ? Number(vacancyParam) : null;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.cargarInformeGuardado().catch(error =>
        console.error('Error al cargar el informe existente', error)
      );
    });
  }

  async guardarInforme(): Promise<void> {
    if (this.isSaving) {
      return;
    }

    this.isSaving = true;
    try {
      const payload = await this.preparePayload('borrador');
      const response = await firstValueFrom(this.informesService.guardarInforme(payload));
      if (response?.id) {
        this.informeId = response.id;
      }
      alert('Informe guardado exitosamente');
    } catch (error) {
      console.error('Error al guardar el informe', error);
      alert('No se pudo guardar el informe. Intentalo nuevamente.');
    } finally {
      this.isSaving = false;
    }
  }

  async generarInforme(): Promise<void> {
    if (this.isGenerating) {
      return;
    }

    this.isGenerating = true;
    try {
      const borradorPayload = await this.preparePayload('borrador');
      const guardarResponse = await firstValueFrom(
        this.informesService.guardarInforme(borradorPayload)
      );
      if (guardarResponse?.id) {
        this.informeId = guardarResponse.id;
      }

      const generadoPayload = await this.preparePayload('generado');
      const response = await firstValueFrom(this.informesService.generarInforme(generadoPayload));
      if (response?.id) {
        this.informeId = response.id;
      }

      const informe = await firstValueFrom(
        this.informesService.obtenerInforme({ informeId: this.informeId })
      );

      if (!informe) {
        alert('No se pudo obtener la información del informe generado.');
        return;
      }

      const pdfBlob = await this.pdfService.buildPdfBlob(informe);
      this.dialog.open(InformePdfPreviewDialogComponent, {
        data: {
          blob: pdfBlob,
          filename: `informe-${this.informeId ?? 'generado'}.pdf`
        },
        width: '900px',
        maxWidth: '95vw'
      });
    } catch (error) {
      console.error('Error al generar el informe', error);
      alert('No se pudo generar el informe. Intentalo nuevamente.');
    } finally {
      this.isGenerating = false;
    }
  }

  private async preparePayload(estado: InformeEstado): Promise<InformePayload> {
    const rawValue = this.form.getRawValue();
    await this.handleFileFields(rawValue);

    const sanitized = this.sanitizeValue(rawValue) as InformeSanitizedSections;

    return {
      id: this.informeId ?? undefined,
      postulanteId: this.postulanteId,
      vacancyId: this.vacancyId,
      estado,
      generales: sanitized.generales ?? {},
      familiares: sanitized.familiares ?? {},
      salud: sanitized.salud ?? {},
      academico: sanitized.academico ?? {},
      antecedentes: sanitized.antecedentes ?? {},
      laboral: sanitized.laboral ?? {},
      economico: sanitized.economico ?? {},
      propiedades: sanitized.propiedades ?? {},
      redes: sanitized.redes ?? {},
      referencias: sanitized.referencias ?? {},
      entrevista: sanitized.entrevista ?? {},
      anexos: sanitized.anexos ?? {}
    };
  }

  private async cargarInformeGuardado(): Promise<void> {
    if (!this.postulanteId && !this.vacancyId && !this.informeId) {
      return;
    }

    try {
      const informe = await firstValueFrom(
        this.informesService.obtenerInforme({
          informeId: this.informeId,
          postulanteId: this.postulanteId,
          vacancyId: this.vacancyId
        })
      );

      if (!informe) {
        return;
      }

      this.informeId = informe.id;
      this.aplicarSeccion('generales', informe);
      this.aplicarSeccion('familiares', informe);
      this.aplicarSeccion('salud', informe);
      this.aplicarSeccion('academico', informe);
      this.aplicarSeccion('antecedentes', informe);
      this.aplicarSeccion('laboral', informe);
      this.aplicarSeccion('economico', informe);
      this.aplicarSeccion('propiedades', informe);
      this.aplicarSeccion('redes', informe);
      this.aplicarSeccion('referencias', informe);
      this.aplicarSeccion('entrevista', informe);
      this.aplicarSeccion('anexos', informe);

      this.form.markAsPristine();
      this.form.markAsUntouched();
    } catch (error) {
      console.error('No se pudo obtener el informe guardado', error);
    }
  }

  private aplicarSeccion(key: InformeSectionKeys, informe: InformeDetalle): void {
    const sectionValue = informe[key];
    if (!sectionValue) {
      return;
    }
    const control = this.form.get(key);
    if (!control) {
      return;
    }
    this.patchControl(control, sectionValue);
  }

  private patchControl(control: AbstractControl, value: unknown): void {
    if (control instanceof FormGroup && value && typeof value === 'object' && !Array.isArray(value)) {
      Object.entries(value as Record<string, unknown>).forEach(([key, val]) => {
        const child = control.get(key);
        if (child) {
          this.patchControl(child, val);
        } else {
          control.addControl(key, this.createControlFromValue(val), { emitEvent: false });
        }
      });
      return;
    }

  if (control instanceof FormArray && Array.isArray(value)) {
    while (control.length > 0) {
      control.removeAt(0, { emitEvent: false });
    }
    value.forEach((item) => {
      control.push(this.createControlFromValue(item), { emitEvent: false });
    });
    return;
  }

  if (control instanceof FormControl) {
    if (typeof value === 'string') {
      control.setValue(this.normalizeControlValue(value), { emitEvent: false });
    } else {
      control.setValue(value ?? null, { emitEvent: false });
    }
  }
}

  private createControlFromValue(value: unknown): AbstractControl {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    const group = this.fb.group({});
    Object.entries(value as Record<string, unknown>).forEach(([key, val]) => {
      group.addControl(key, this.createControlFromValue(val));
    });
    return group;
  }

  if (Array.isArray(value)) {
    const controls = value.map((item) => this.createControlFromValue(item));
    return new FormArray(controls);
  }

  if (typeof value === 'string') {
    return this.fb.control(this.normalizeControlValue(value));
  }

  return this.fb.control(value ?? null);
}

  private normalizeControlValue(value: string): string | null {
    const trimmed = value.trim();
    if (!trimmed) {
      return null;
    }
    if (trimmed.startsWith('data:image')) {
      return trimmed;
    }
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      return trimmed;
    }
    const match = trimmed.match(/\/files\/[^\s'"]+/);
    if (match) {
      const relative = match[0];
      return `${this.filesBaseUrl}${relative.startsWith('/') ? relative : '/' + relative}`;
    }
    if (trimmed.startsWith('files/')) {
      return `${this.filesBaseUrl}/${trimmed}`;
    }
    return trimmed;
  }

  private async handleFileFields(raw: Record<string, unknown>): Promise<void> {
    const redes = raw['redes'] as Record<string, unknown> | undefined;
    if (redes && redes['capturaPerfil'] instanceof File) {
      redes['capturaPerfil'] = await this.fileToBase64(redes['capturaPerfil'] as File);
    }
  }

  private sanitizeValue(value: unknown): unknown {
  if (value === undefined || value === null) {
    return null;
  }

  if (value instanceof File) {
    return null;
  }

  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed.length) {
      return null;
    }
    if (trimmed.includes('/files/')) {
      const absolute = trimmed.match(/^https?:\/\/[\s\S]+(\/files\/[^\s'"]+)/);
      if (absolute) {
        return absolute[1];
      }
      const relativeOnly = trimmed.match(/^\/files\/[^\s'"]+$/);
      if (relativeOnly) {
        return relativeOnly[0];
      }
      return trimmed;
    }
    return trimmed;
  }

    if (Array.isArray(value)) {
      return value.map(item => this.sanitizeValue(item));
    }

    if (typeof value === 'object') {
      const result: Record<string, unknown> = {};
      Object.entries(value as Record<string, unknown>).forEach(([key, val]) => {
        result[key] = this.sanitizeValue(val);
      });
      return result;
    }

    return value;
  }

  private fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () =>
        resolve(typeof reader.result === 'string' ? reader.result : String(reader.result ?? ''));
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }
}

