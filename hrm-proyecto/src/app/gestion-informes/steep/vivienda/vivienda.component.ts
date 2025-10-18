import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-vivienda',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './vivienda.component.html',
  styleUrls: ['./vivienda.component.css']
})
export class ViviendaComponent implements OnInit {

  @Input() form!: FormGroup;
  private readonly serviciosEntorno = [
    { key: 'sistemaAguaPotable', label: 'Sistema de abastecimiento de agua potable' },
    { key: 'sistemaAlcantarilladoAguasServidas', label: 'Sistema de alcantarillado de aguas servidas' },
    { key: 'sistemaDesaguePluvialesDrenajes', label: 'Sistema de desagüe de aguas pluviales, drenajes' },
    { key: 'sistemaAlumbradoPublico', label: 'Sistema de alumbrado público' },
    { key: 'servicioEnergiaElectrica', label: 'Servicio de energía eléctrica' },
    { key: 'servicioRecoleccionBasura', label: 'Servicio de recolección de basura' },
    { key: 'servicioGasPropano', label: 'Servicio de gas propano' },
    { key: 'servicioSeguridadPublica', label: 'Servicio de seguridad pública' },
    { key: 'servicioAsistenciaMedica', label: 'Servicio de asistencia médica / hospitales / centros de salud' },
    { key: 'establecimientosEducativos', label: 'Establecimientos educativos' },
    { key: 'servicioTransportePublico', label: 'Servicio de transporte público' },
    { key: 'servicioTelecomunicacionesTelefoniaPublica', label: 'Servicio de telecomunicaciones (telefonía pública)' },
    { key: 'pavimentacion', label: 'Pavimentación' },
    { key: 'servicioVigilanciaPrivada', label: 'Servicio de vigilancia privada' },
    { key: 'existeVandalismoZona', label: 'Existe vandalismo en la zona' },
    { key: 'hayFarmacoDependencia', label: 'Hay problemas de fármaco dependencia' },
    { key: 'zonaConsideradaRoja', label: 'La zona es considerada roja' },
    { key: 'zonaAltaDensidadPoblacion', label: 'Es una zona de alta densidad de población' },
    { key: 'haSidoVictimaDelitoDomicilio', label: 'Ha sido víctima de extorsión robo o amenazas en su actual o anterior domicilio' },
    { key: 'claseSocialZona', label: 'Clase social de la zona' },                 // texto
    { key: 'nivelPeligrosidad', label: 'Nivel de peligrosidad' },               // texto
    { key: 'referenciasVecinos', label: 'Referencias de los vecinos' }          // texto
  ];
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // 🧩 Asegura que el form exista
    if (!this.form) {
      this.form = this.fb.group({});
    }

    // ======================
    // 🏠 INFORMACIÓN DE VIVIENDA
    // ======================
    this.ensureControl('tipoDomicilio');
    this.ensureControl('ubicacion');
    this.ensureControl('serviciosBasicos');
    this.ensureControl('residencia');
    this.ensureControl('propietarioNombre');
    this.ensureControl('parentescoPropietario');
    this.ensureControl('clasificacionPoblacion');
    this.ensureControl('colorFachada');
    this.ensureControl('colorPuertas');
    this.ensureControl('caracteristicasDomicilio');
    this.ensureControl('habitacionesDormir');
    this.ensureControl('ambientesTotales');
    this.ensureControl('estadoDomicilio');
    this.ensureControl('tipoConstruccion');
    this.ensureControl('materialTecho');
    this.ensureControl('materialPiso');
    this.ensureControl('nivelesDomicilio');
    this.ensureControl('parqueDomicilio');
    this.ensureControl('tamanoPropiedad');
    this.ensureControl('television');
    this.ensureControl('cantidadTelevisores');
    this.ensureControl('servicioCable');
    this.ensureControl('internet');
    this.ensureControl('computadora');
    this.ensureControl('cantidadComputadoras');
    this.ensureControl('equipoSonido');
    this.ensureControl('microondas');
    this.ensureControl('refrigerador');
    this.ensureControl('estufa');
    this.ensureControl('tiempoVivir');
    this.ensureControl('habitantesTotales');
    this.ensureControl('distanciaTrabajo');
    this.ensureControl('tiempoTraslado');
    this.ensureControl('medioTransporte');

    // Array dinámico para habitantes
    this.ensureArray('habitantesVivienda');

    this.serviciosEntorno.forEach(f => this.ensureControl(f.key));
  }

  // ======================
  // Helpers
  // ======================
  private ensureControl(name: string) {
    if (!this.form.get(name)) this.form.addControl(name, this.fb.control(''));
  }
  private ensureArray(name: string) {
    if (!this.form.get(name)) this.form.addControl(name, this.fb.array([]));
  }

  // ======================
  // CRUD dinámico de Habitantes
  // ======================
  get habitantesVivienda(): FormArray {
    return this.form.get('habitantesVivienda') as FormArray;
  }
  get camposServiciosEntorno() {
    return this.serviciosEntorno;
  }
  agregarHabitante(): void {
    const habitante = this.fb.group({
      nombre: [''],
      edad: [''],
      parentesco: [''],
      ocupacion: [''],
      lugarTrabajo: ['']
    });
    this.habitantesVivienda.push(habitante);
  }

  eliminarHabitante(i: number): void {
    this.habitantesVivienda.removeAt(i);
  }
}