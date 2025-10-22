import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';

const inlineDataUrlRegex = /(data:image\/[a-zA-Z0-9+.\-]+;base64,[A-Za-z0-9+/=]+)/g;
import type {
  Content,
  DynamicContent,
  Margins,
  StyleDictionary,
  TDocumentDefinitions,
  TableCell
} from 'pdfmake/interfaces';
import { InformeDetalle } from '../services/informes.service';

@Injectable({ providedIn: 'root' })
export class InformePdfService {
  private pdfReady = false;
  private readonly apiBaseUrl = environment.apiUrl.replace(/\/api$/, '');
  private readonly imageCache = new Map<string, string>();
  private readonly labelOverrides = new Map<string, string>([
    ['nombreCompleto', 'Nombre completo'],
    ['direccion', 'Dirección'],
    ['sexo', 'Sexo'],
    ['edad', 'Edad / años'],
    ['fechaNacimiento', 'Fecha de nacimiento'],
    ['lugarNacimiento', 'Lugar de nacimiento'],
    ['cui', 'No. único de identificación / CUI'],
    ['extendida', 'Extendida'],
    ['estadoCivil', 'Estado civil'],
    ['licenciaConducir', 'Licencia de conducir'],
    ['licenciaTipo', 'Licencia de conducir Tipo'],
    ['licenciaNumero', 'Número de documento'],
    ['licenciaVigencia', 'Vigencia de la licencia'],
    ['numeroDocumento', 'Número de documento'],
    ['nit', 'No. de N.I.T.'],
    ['igss', 'No. afiliación IGSS'],
    ['irtra', 'No. afiliación IRTRA'],
    ['pasaporte', 'Pasaporte'],
    ['visaAmericana', 'Visa Americana'],
    ['telCasa', 'Teléfono casa'],
    ['telCelular', 'Teléfono celular'],
    ['telEmergencia', 'Teléfono emergencia'],
    ['contactoEmergencia', 'Contacto de emergencia'],
    ['parentesco', 'Parentesco'],
    ['email', 'Correo electrónico'],
    ['trabajaActualmente', 'Trabaja actualmente'],
    ['empresa', 'Empresa'],
    ['empresaSolicitante', 'Empresa solicitante'],
    ['laboraParaLaEmpresa', 'Labora para la empresa'],
    ['puestoAplica', 'Puesto al que aplica'],
    ['medioTransporte', 'Medio de transporte'],
    ['religion', 'Religión'],
    ['tipoSangre', 'Tipo de sangre'],
    ['estatura', 'Estatura metros'],
    ['peso', 'Peso libras'],
    ['cicatrices', 'Cicatrices visibles en el rostro'],
    ['cabello', 'Color de cabello'],
    ['tipoCabello', 'Tipo de cabello'],
    ['apodo', 'Apodo'],
    ['profesion', 'Profesión'],
    ['pretension', 'Pretensión salarial'],
    ['comentarios', 'Observaciones y comentarios'],
    ['nombrePadre', 'Nombre del padre'],
    ['edadPadre', 'Edad / años'],
    ['fechaNacimientoPadre', 'Fecha de nacimiento'],
    ['originarioPadre', 'Originario'],
    ['vivePadre', 'Vive su progenitor'],
    ['viveConPadre', 'Vive con él'],
    ['escolaridadPadre', 'Escolaridad'],
    ['profesionPadre', 'Profesión / ocupación'],
    ['residenciaPadre', 'Residencia'],
    ['nombreMadre', 'Nombre de la madre'],
    ['edadMadre', 'Edad / años'],
    ['fechaNacimientoMadre', 'Fecha de nacimiento'],
    ['originarioMadre', 'Originaria'],
    ['viveMadre', 'Vive su progenitora'],
    ['viveConMadre', 'Vive con ella'],
    ['escolaridadMadre', 'Escolaridad'],
    ['profesionMadre', 'Profesión / ocupación'],
    ['residenciaMadre', 'Residencia'],
    ['resideEnPareja', 'Reside en pareja'],
    ['nombrePareja', 'Nombre de la pareja'],
    ['edadPareja', 'Edad / años'],
    ['fechaNacimientoPareja', 'Fecha de nacimiento'],
    ['originarioPareja', 'Originario(a)'],
    ['vivenJuntos', 'Viven juntos'],
    ['tiempoRelacion', 'Tiempo de relación'],
    ['escolaridadPareja', 'Escolaridad'],
    ['profesionPareja', 'Profesión / ocupación'],
    ['residenciaPareja', 'Residencia'],
    ['hermanos', 'Hermanos'],
    ['hijos', 'Hijos'],
    ['universitario', 'Estudios superiores'],
    ['diversificado', 'Estudios diversificado'],
    ['primaria', 'Estudios básicos y primaria'],
    ['tecnico', 'Técnicos, diplomas y/o cursos recibidos en centros de capacitación laboral'],
    ['conocimientosGenerales', 'Conocimientos generales']
  ]);
  private readonly nestedLabelOverrides: Record<string, Record<string, string>> = {
    hermanos: {
      nombre: 'Nombre del hermano (a)',
      edad: 'Edad / años',
      fechaNacimiento: 'Fecha de nacimiento',
      originario: 'Originario (a)',
      viveCon: 'Vive con él / ella',
      escolaridad: 'Escolaridad',
      estadoCivil: 'Estado civil',
      hijos: 'Hijos (a)',
      profesion: 'Ocupación / profesión',
      residencia: 'Residencia'
    },
    hijos: {
      nombre: 'Nombre del hijo (a)',
      edad: 'Edad / años',
      fechaNacimiento: 'Fecha de nacimiento',
      originario: 'Originario (a)',
      viveCon: 'Vive con él / ella',
      resideEn: 'Residencia'
    },
    universitario: {
      nombre: 'Universidad',
      carrera: 'Carrera universitaria',
      anioInicio: 'Año de inicio',
      anioFin: 'Año final',
      gradoAcademico: 'Grado académico'
    },
    diversificado: {
      institucion: 'Institución educativa',
      titulo: 'Grado académico',
      anio: 'Año'
    },
    primaria: {
      institucion: 'Institución educativa',
      diploma: 'Título obtenido',
      anio: 'Año'
    },
    tecnico: {
      institucion: 'Institución',
      diploma: 'Diploma / Técnico',
      anio: 'Duración'
    }
  };
  private readonly nestedExcludeKeys: Record<string, Set<string>> = {
    universitario: new Set(['editando']),
    diversificado: new Set(['editando']),
    primaria: new Set(['editando']),
    tecnico: new Set(['editando'])
  };
  private readonly stackedArrayContexts = new Set([
    'hermanos',
    'hijos',
    'universitario',
    'diversificado',
    'primaria',
    'tecnico'
  ]);

  async buildPdfBlob(informe: InformeDetalle): Promise<Blob> {
    if (typeof window === 'undefined') {
      throw new Error('Generacion de PDF solo disponible en el navegador.');
    }

    await this.ensurePdfFonts();
    const informeCopy: InformeDetalle = JSON.parse(JSON.stringify(informe));
    await this.embedRemoteImages(informeCopy);
    const docDefinition = this.createDocDefinition(informeCopy);
    return new Promise<Blob>((resolve, reject) => {
      try {
        pdfMake.createPdf(docDefinition).getBlob((blob: Blob) => resolve(blob));
      } catch (error) {
        reject(error);
      }
    });
  }

  private async ensurePdfFonts(): Promise<void> {
    if (this.pdfReady) {
      return;
    }
    const fontsModule = await import('pdfmake/build/vfs_fonts');
    const vfs =
      (fontsModule as any).pdfMake?.vfs ??
      (fontsModule as any).default ??
      fontsModule;
    if (!vfs) {
      throw new Error('No se pudo cargar el conjunto de fuentes para pdfMake.');
    }
    (pdfMake as any).vfs = vfs;
    this.pdfReady = true;
  }

  private async embedRemoteImages(node: unknown): Promise<void> {
    if (Array.isArray(node)) {
      for (let i = 0; i < node.length; i += 1) {
        const item = node[i];
        if (typeof item === 'string') {
          const converted = await this.convertPathToDataUrl(item);
          if (converted) {
            node[i] = { archivo: converted };
          }
        } else {
          await this.embedRemoteImages(item);
        }
      }
      return;
    }

    if (node && typeof node === 'object') {
      const record = node as Record<string, unknown>;
      for (const [key, value] of Object.entries(record)) {
        if (typeof value === 'string') {
          const converted = await this.convertPathToDataUrl(value);
          if (converted) {
            record[key] = converted;
          }
        } else {
          await this.embedRemoteImages(value);
        }
      }
    }
  }

  private async convertPathToDataUrl(value: string): Promise<string | null> {
    const trimmed = value.trim();
    if (trimmed.startsWith('data:image')) {
      return trimmed;
    }
    const match = trimmed.match(/\/files\/[^\s'"]+/);
    if (!match) {
      return null;
    }
    const relativePath = match[0];
    if (this.imageCache.has(relativePath)) {
      return this.imageCache.get(relativePath)!;
    }
    const absoluteUrl =
      trimmed.startsWith('http://') || trimmed.startsWith('https://')
        ? trimmed
        : `${this.apiBaseUrl}${relativePath.startsWith('/') ? relativePath : '/' + relativePath}`;
    try {
      const response = await fetch(absoluteUrl, { credentials: 'include' });
      if (!response.ok) {
        return null;
      }
      const blob = await response.blob();
      const dataUrl = await this.blobToDataUrl(blob);
      this.imageCache.set(relativePath, dataUrl);
      return dataUrl;
    } catch (error) {
      console.error('No se pudo cargar la imagen', error);
      return null;
    }
  }

  private blobToDataUrl(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('No se pudo convertir el archivo a base64'));
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(blob);
    });
  }

  private createDocDefinition(informe: InformeDetalle): TDocumentDefinitions {
    const sections: Content[] = [];

    sections.push(this.buildSectionTitle('ESTUDIO SOCIOECONÓMICO'));
    sections.push(
      this.buildInfoBlock(
        'INFORMACIÓN GENERAL',
        informe.generales ?? {},
        [
          'nombreCompleto',
          'direccion',
          'sexo',
          'edad',
          'fechaNacimiento',
          'lugarNacimiento',
          'cui',
          'extendida',
          'estadoCivil',
          'licenciaConducir',
          'licenciaTipo',
          'licenciaNumero',
          'licenciaVigencia',
          'numeroDocumento',
          'nit',
          'igss',
          'irtra',
          'pasaporte',
          'visaAmericana',
          'telCasa',
          'telCelular',
          'telEmergencia',
          'contactoEmergencia',
          'parentesco',
          'email',
          'trabajaActualmente',
          'empresa',
          'empresaSolicitante',
          'laboraParaLaEmpresa',
          'puestoAplica',
          'medioTransporte',
          'religion',
          'tipoSangre',
          'estatura',
          'peso',
          'cicatrices',
          'cabello',
          'tipoCabello',
          'apodo',
          'profesion',
          'pretension'
        ],
        {
          observationsKey: 'comentarios',
          observationsTitle: 'OBSERVACIONES Y COMENTARIOS'
        }
      )
    );

    sections.push(
      this.buildInfoBlock('DATOS FAMILIARES', informe.familiares ?? {}, [], {
        customRender: (value) => this.renderFamilySection(value),
        observationsKey: 'comentarios',
        observationsTitle: 'OBSERVACIONES Y COMENTARIOS'
      })
    );

    sections.push(
      this.buildInfoBlock('DATOS EDUCACIONALES', informe.academico ?? {}, [], {
        customRender: (value) => this.renderAcademicSection(value)
      })
    );

    sections.push(
      this.buildInfoBlock('SALUD', informe.salud ?? {}, [
        'serviciosMedicos',
        'frecuenciaMedico',
        'enfermedadCongenita',
        'alergias',
        'enfOjos',
        'usaLentes',
        'enfCardiovasculares',
        'enfCronicas',
        'ingresosHospitalarios',
        'operaciones',
        'accidentes',
        'tratamientoMedico'
      ])
    );

    sections.push(this.buildInfoBlock('ANTECEDENTES', informe.antecedentes ?? {}));
    sections.push(this.buildInfoBlock('INFORMACIÓN LABORAL', informe.laboral ?? {}));
    sections.push(this.buildInfoBlock('INFORMACIÓN ECONÓMICA', informe.economico ?? {}));
    sections.push(this.buildInfoBlock('VIVIENDA', informe.propiedades ?? {}));
    sections.push(this.buildInfoBlock('REDES SOCIALES', informe.redes ?? {}));
    sections.push(this.buildInfoBlock('REFERENCIAS', informe.referencias ?? {}));
    sections.push(this.buildInfoBlock('ENTREVISTA', informe.entrevista ?? {}));
    sections.push(this.buildInfoBlock('ANEXOS', informe.anexos ?? {}));

    const headerContent: DynamicContent = (currentPage: number, pageCount: number) =>
      ({
        margin: [40, 20, 40, 0] as Margins,
        columns: [
          { text: 'HRM Consulting', style: 'headerBrand' },
          {
            text: `Informe No. ${this.formatId(informe.id)} - Página ${currentPage} de ${pageCount}`,
            alignment: 'right',
            style: 'headerMeta'
          }
        ]
      } as Content);

    const footerContent: DynamicContent = () =>
      ({
        margin: [40, 0, 40, 20] as Margins,
        alignment: 'center',
        text: 'CONFIDENCIAL',
        style: 'footer'
      } as Content);

    return {
      pageMargins: this.pageMargins,
      header: headerContent,
      footer: footerContent,
      content: sections,
      styles: this.styles
    };
  }

  private buildSectionTitle(title: string): Content {
    return {
      text: title,
      style: 'mainTitle',
      margin: [0, 20, 0, 20]
    };
  }

  private buildInfoBlock(
    title: string,
    data: Record<string, unknown>,
    order: string[] = [],
    options?: {
      customRender?: (value: Record<string, unknown>) => Content | Content[];
      observationsKey?: string;
      observationsTitle?: string;
    }
  ): Content {
    const stack: Content[] = [
      {
        text: title,
        style: 'sectionTitle',
        margin: [0, 16, 0, 8]
      }
    ];

    const observationsKey = options?.observationsKey;
    const observationsTitle =
      options?.observationsTitle ?? 'OBSERVACIONES Y COMENTARIOS';
    const observationsValue = observationsKey ? data?.[observationsKey] : undefined;

    if (options?.customRender) {
      const rendered = options.customRender(data);
      if (Array.isArray(rendered)) {
        stack.push(...rendered);
      } else {
        stack.push(rendered);
      }

      if (observationsKey) {
        stack.push(this.buildObservationBlock(observationsTitle, observationsValue));
      }
      return { stack };
    }

    const tableRows: TableCell[][] = [];

    this.sortEntries(data, order).forEach(([key, value]) => {
      if (observationsKey && key === observationsKey) {
        return;
      }

      if (Array.isArray(value) && value.length > 0 && this.shouldRenderRichArray(value)) {
        const headerLabel = this.labelFor(key).toLocaleUpperCase('es-GT');
        stack.push({
          text: headerLabel,
          style: 'arraySectionTitle',
          margin: [0, 12, 0, 4]
        });
        stack.push(this.renderArrayOfObjects(value, key));
      } else {
        tableRows.push([
          { text: this.labelFor(key), style: 'tableLabel' } as TableCell,
          { text: this.formatValue(value), style: 'tableValueRight' } as TableCell
        ]);
      }
    });

    if (tableRows.length > 0) {
      stack.push({
        table: {
          widths: ['40%', '60%'],
          body: tableRows
        },
        layout: 'lightHorizontalLines'
      });
    }

    if (stack.length === 1) {
      stack.push({
        table: {
          widths: ['40%', '60%'],
          body: [
            [
              { text: 'Sin información', colSpan: 2, style: 'tableValueRight' } as TableCell,
              { text: '', style: 'tableValueRight' } as TableCell
            ]
          ]
        },
        layout: 'lightHorizontalLines'
      });
    }

    if (observationsKey) {
      stack.push(
        this.buildObservationBlock(observationsTitle, observationsValue)
      );
    }

    return { stack };
  }

  private renderFamilySection(data: Record<string, unknown>): Content[] {
    const stack: Content[] = [];

    const addMember = (keys: string[]) => {
      const block = this.buildKeyValueTable(keys, data, stack.length ? 12 : 0);
      if (block) {
        stack.push(block);
      }
    };

    addMember([
      'nombrePadre',
      'edadPadre',
      'fechaNacimientoPadre',
      'originarioPadre',
      'vivePadre',
      'viveConPadre',
      'escolaridadPadre',
      'profesionPadre',
      'residenciaPadre'
    ]);

    addMember([
      'nombreMadre',
      'edadMadre',
      'fechaNacimientoMadre',
      'originarioMadre',
      'viveMadre',
      'viveConMadre',
      'escolaridadMadre',
      'profesionMadre',
      'residenciaMadre'
    ]);

    addMember([
      'resideEnPareja',
      'nombrePareja',
      'edadPareja',
      'fechaNacimientoPareja',
      'originarioPareja',
      'vivenJuntos',
      'tiempoRelacion',
      'escolaridadPareja',
      'profesionPareja',
      'residenciaPareja'
    ]);

    const hermanos = data['hermanos'];
    if (Array.isArray(hermanos) && hermanos.length > 0) {
      stack.push({
        text: 'HERMANOS',
        style: 'arraySectionTitle',
        margin: [0, stack.length ? 16 : 12, 0, 4]
      });
      stack.push(this.renderArrayOfObjects(hermanos, 'hermanos'));
    }

    const hijos = data['hijos'];
    if (Array.isArray(hijos) && hijos.length > 0) {
      stack.push({
        text: 'HIJOS',
        style: 'arraySectionTitle',
        margin: [0, stack.length ? 16 : 12, 0, 4]
      });
      stack.push(this.renderArrayOfObjects(hijos, 'hijos'));
    }

    if (!stack.length) {
      stack.push({
        text: 'Sin información familiar registrada',
        style: 'tableValueRight'
      });
    }

    return stack;
  }

  private buildKeyValueTable(keys: string[], data: Record<string, unknown>, marginTop: number): Content | null {
    const body: TableCell[][] = [];
    let hasContent = false;

    keys.forEach((key) => {
      const formatted = this.formatValue(data[key]);
      if (formatted !== '-') {
        hasContent = true;
      }
      body.push([
        { text: this.labelFor(key), style: 'tableLabel' } as TableCell,
        { text: formatted, style: 'tableValueRight' } as TableCell
      ]);
    });

    if (!hasContent) {
      return null;
    }

    return {
      margin: [0, marginTop, 0, 0],
      table: {
        widths: ['40%', '60%'],
        body
      },
      layout: 'lightHorizontalLines'
    };
  }

  private renderAcademicSection(value: Record<string, unknown>): Content[] {
    const content: Content[] = [];

    (['universitario', 'diversificado', 'tecnico', 'primaria'] as const).forEach((key) => {
      const list = value[key as keyof typeof value];
      if (Array.isArray(list) && list.length > 0) {
        const headerLabel = this.labelFor(key).toLocaleUpperCase('es-GT');
        content.push({
          text: headerLabel,
          style: 'arraySectionTitle',
          margin: [0, 12, 0, 4]
        });
        content.push(this.renderArrayOfObjects(list, key));
      }
    });

    const conocimientos = value['conocimientosGenerales'];
    if (conocimientos && typeof conocimientos === 'object') {
      content.push({
        text: 'CONOCIMIENTOS GENERALES',
        style: 'arraySectionTitle',
        margin: [0, 12, 0, 4]
      });
      content.push(
        this.buildSimpleTable(conocimientos as Record<string, unknown>)
      );
    }

    if (!content.length) {
      content.push({
        text: 'Sin información académica registrada',
        style: 'tableValueRight'
      });
    }

    return content;
  }

  private renderArrayOfObjects(list: unknown[], contextKey?: string): Content {
    if (!Array.isArray(list) || list.length === 0) {
      return { text: 'Sin datos', style: 'tableValueRight' };
    }

    const imageCandidates: Array<{ raw: unknown; imageData: string }> = [];
    const nonImageItems: unknown[] = [];

    list.forEach((item) => {
      if (!item) {
        nonImageItems.push(item);
        return;
      }
      let imageData: string | null = null;
      if (typeof item === 'string') {
        imageData = this.extractImageData(item);
      } else if (typeof item === 'object') {
        imageData = this.extractImageFromObject(item as Record<string, unknown>);
      }

      if (imageData) {
        imageCandidates.push({ raw: item, imageData });
      } else {
        nonImageItems.push(item);
      }
    });

    if (imageCandidates.length === list.length) {
      return this.renderImageEntries(imageCandidates);
    }

    if (contextKey && this.stackedArrayContexts.has(contextKey)) {
      const objectRecords = nonImageItems.filter(
        (item): item is Record<string, unknown> => Boolean(item && typeof item === 'object')
      );
      if (objectRecords.length) {
        return this.renderStackedObjectEntries(objectRecords, contextKey);
      }
    }

    const columnSet = nonImageItems.reduce<Set<string>>((accumulator, item) => {
      if (item && typeof item === 'object') {
        Object.keys(item as Record<string, unknown>).forEach((key) => accumulator.add(key));
      }
      return accumulator;
    }, new Set<string>());
    const columns = Array.from(columnSet.values());

    const body: TableCell[][] = [
      columns.map((key) => ({ text: this.labelFor(key), style: 'tableLabel' } as TableCell))
    ];

    nonImageItems.forEach((item) => {
      const row: TableCell[] = columns.map((key) => ({
        text: this.formatValue((item as Record<string, unknown>)[key]),
        style: 'tableValueRight'
      }));
      body.push(row);
    });

    return {
      table: {
        widths: columns.map(() => `${100 / columns.length}%`),
        body
      },
      layout: 'lightHorizontalLines'
    };
  }

  private renderStackedObjectEntries(
    records: Record<string, unknown>[],
    contextKey?: string
  ): Content {
    if (!records.length) {
      return { text: 'Sin datos', style: 'tableValueRight' };
    }

    const overrides = contextKey ? this.nestedLabelOverrides[contextKey] ?? {} : undefined;
    const excluded = contextKey ? this.nestedExcludeKeys[contextKey] : undefined;

    const stack: Content[] = records.map((record, index) => {
      const rows = Object.entries(record).filter(
        ([key]) => !(excluded?.has(key))
      );

      const body: TableCell[][] = rows.map(([key, value]) => [
        {
          text: overrides?.[key] ?? this.labelFor(key),
          style: 'tableLabel'
        } as TableCell,
        { text: this.formatValue(value), style: 'tableValueRight' } as TableCell
      ]);

      if (!body.length) {
        body.push([
          { text: 'Sin información', colSpan: 2, style: 'tableLabel' } as TableCell,
          { text: '', style: 'tableValueRight' } as TableCell
        ]);
      }

      return {
        margin: [0, index === 0 ? 0 : 12, 0, 0],
        table: {
          widths: ['40%', '60%'],
          body
        },
        layout: 'lightHorizontalLines'
      };
    });

    return { stack };
  }

  private buildObservationBlock(title: string, value: unknown): Content {
    const formatted = this.formatValue(value);
    const hasContent = formatted && formatted.trim() !== '-' && formatted.trim().length > 0;

    return {
      stack: [
        {
          text: title,
          style: 'observationTitle',
          margin: [0, 12, 0, 4]
        },
        {
          text: hasContent ? formatted : 'Sin observaciones registradas',
          style: 'observationText',
          margin: [0, 0, 0, 12]
        }
      ]
    };
  }

  private renderImageEntries(items: Array<{ raw: unknown; imageData: string }>): Content {
    const stack: Content[] = [];

    items.forEach(({ raw, imageData }, index) => {
      stack.push({
        image: imageData,
        width: 300,
        alignment: 'center',
        margin: [0, index === 0 ? 0 : 12, 0, 12]
      });
    });

    return { stack };
  }

  private shouldRenderRichArray(list: unknown[]): boolean {
    return list.some(
      (item) =>
        (item && typeof item === 'object') ||
        (typeof item === 'string' && this.extractImageData(item) !== null)
    );
  }

  private buildSimpleTable(data: Record<string, unknown>): Content {
    const body = Object.entries(data).map(([key, value]) => [
      { text: this.labelFor(key), style: 'tableLabel' } as TableCell,
      { text: this.formatValue(value), style: 'tableValueRight' } as TableCell
    ]);

    return {
      table: {
        widths: ['40%', '60%'],
        body
      },
      layout: 'lightHorizontalLines'
    };
  }

  private sortEntries(data: Record<string, unknown>, order: string[]): [string, unknown][] {
    const entries = Object.entries(data ?? {});
    if (!order.length) {
      return entries;
    }
    const orderMap = new Map(order.map((key, index) => [key, index]));
    return entries.sort((a, b) => {
      const aIndex = orderMap.has(a[0]) ? orderMap.get(a[0])! : Number.MAX_SAFE_INTEGER;
      const bIndex = orderMap.has(b[0]) ? orderMap.get(b[0])! : Number.MAX_SAFE_INTEGER;
      return aIndex - bIndex;
    });
  }

  private labelFor(key: string): string {
    return this.labelOverrides.get(key) ?? this.toLabel(key);
  }

  private toLabel(key: string): string {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/_/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/^./, (char) => char.toUpperCase());
  }

  private extractImageData(value: unknown): string | null {
    if (typeof value !== 'string') {
      return null;
    }
    const normalized = value.replace(/\s+/g, '');
    const match = normalized.match(/data:image\/[a-zA-Z0-9+]+;base64,[A-Za-z0-9+/=]+/);
    return match ? match[0] : null;
  }

  private extractImageFromObject(item: Record<string, unknown>): string | null {
    const direct = this.extractImageData(item['archivo']);
    if (direct) {
      return direct;
    }
    const alternative = this.extractImageData(item['archivoBase64']);
    if (alternative) {
      return alternative;
    }
    if (typeof item['texto'] === 'string') {
      const inline = this.extractImageData(item['texto']);
      if (inline) {
        return inline;
      }
    }
    return null;
  }

  private formatValue(value: unknown): string {
    if (value === null || value === undefined) {
      return '-';
    }
    if (typeof value === 'boolean') {
      return value ? 'Sí' : 'No';
    }
    if (typeof value === 'string') {
      const trimmed = value.trim();
      if (trimmed.toLowerCase() === 'true' || trimmed.toLowerCase() === 'false') {
        return trimmed.toLowerCase() === 'true' ? 'Sí' : 'No';
      }
      const asDate = new Date(trimmed);
      if (!Number.isNaN(asDate.getTime()) && /\d/.test(trimmed)) {
        const day = String(asDate.getDate()).padStart(2, '0');
        const month = String(asDate.getMonth() + 1).padStart(2, '0');
        const year = String(asDate.getFullYear());
        return `${day}/${month}/${year}`;
      }
      return trimmed.length ? trimmed : '-';
    }
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return '-';
      }
      if (value.every((item) => typeof item !== 'object')) {
        return value.map((item) => this.formatValue(item)).join(', ');
      }
      return value
        .map((item, index) => `${index + 1}. ${this.formatValue(item)}`)
        .join('\n');
    }
    if (typeof value === 'object') {
      return Object.entries(value as Record<string, unknown>)
        .map(([key, val]) => `${this.labelFor(key)}: ${this.formatValue(val)}`)
        .join('\n');
    }
    return String(value);
  }

  private formatId(id: number | undefined): string {
    if (!id) {
      return '---';
    }
    return id.toString().padStart(6, '0');
  }

  private get pageMargins(): Margins {
    return [40, 80, 40, 60];
  }

  private get styles(): StyleDictionary {
    return {
      mainTitle: {
        fontSize: 20,
        bold: true,
        alignment: 'center'
      },
      sectionTitle: {
        fontSize: 14,
        bold: true,
        color: 'white',
        fillColor: '#000000',
        alignment: 'left'
      },
      arraySectionTitle: {
        fontSize: 12,
        bold: true,
        color: 'white',
        fillColor: '#000000',
        alignment: 'left'
      },
      subSectionTitle: {
        fontSize: 12,
        bold: true,
        margin: [0, 12, 0, 4]
      },
      observationTitle: {
        fontSize: 12,
        bold: true,
        color: 'white',
        fillColor: '#000000',
        alignment: 'left'
      },
      observationText: {
        fontSize: 10,
        alignment: 'justify'
      },
      tableLabel: {
        fontSize: 10,
        bold: true
      },
      tableValue: {
        fontSize: 10
      },
      tableValueRight: {
        fontSize: 10,
        alignment: 'right'
      },
      headerBrand: {
        fontSize: 12,
        bold: true,
        color: '#0A7A3B'
      },
      headerMeta: {
        fontSize: 9,
        color: '#555555'
      },
      footer: {
        fontSize: 12,
        bold: true,
        color: '#C62828'
      },
      imageCaption: {
        fontSize: 10,
        bold: true
      }
    };
  }
}

























