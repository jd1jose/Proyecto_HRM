import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-informacion-economica',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './informacion-economica.component.html',
  styleUrls: ['./informacion-economica.component.css']
})
export class InformacionEconomicaComponent implements OnInit {

  @Input() form!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // ⚠️ Asegura que el form exista antes de agregar controles
    if (!this.form) {
      this.form = this.fb.group({});
    }

    // Crear los controles principales si no existen
    this.ensureControl('ingresosActuales');
    this.ensureControl('salarioPareja');
    this.ensureControl('recibeRemesa');
    this.ensureControl('ingresoAprox');
    this.ensureControl('otrosIngresos');
    this.ensureControl('origenIngreso');
    this.ensureControl('ingresoAdicional');
    this.ensureControl('laborandoActualmente');
    this.ensureControl('empresa');
    this.ensureControl('ultimoSalario');
    this.ensureControl('poseeCreditos');
    this.ensureControl('cuantosCreditos');
    this.ensureControl('poseeTarjetas');
    this.ensureControl('cuantasTarjetas');
    this.ensureControl('atrasoCuotas');
    this.ensureControl('atrasoTarjetas');
    this.ensureControl('demandaFinanciera');
    this.ensureControl('embargosActivos');
    this.ensureControl('promedioGastos');
    this.ensureControl('salarioOfrecido');
    this.ensureControl('ingresoFamiliar');
    this.ensureControl('cuentasMonetarias');
    this.ensureControl('cuentasAhorro');
    //ingresos 
    this.ensureControl('laboraActualmente');
    this.ensureControl('ultimoSalarioDevengado');
    this.ensureControl('ingresoActual');
    this.ensureControl('salarioPareja');
    this.ensureControl('ingresosAdicionales');
    this.ensureControl('ingresoTotalFamiliar');
    //egresos
    this.ensureControl('hipoteca');
    this.ensureControl('alquiler');
    this.ensureControl('mantenimiento');
    this.ensureControl('seguridad');
    this.ensureControl('agua');
    this.ensureControl('luz');
    this.ensureControl('gas');
    this.ensureControl('internet');
    this.ensureControl('telefonoFijo');
    this.ensureControl('cable');
    this.ensureControl('alimentacion');
    this.ensureControl('serviciosDomesticos');
    this.ensureControl('extraccionDesechos');
    this.ensureControl('recreacion');
    this.ensureControl('vestuario');
    this.ensureControl('medicamentos');
    this.ensureControl('estudiosPropios');
    this.ensureControl('estudiosTerceros');
    this.ensureControl('ahorro');
    this.ensureControl('pagoTarjeta');
    this.ensureControl('pagoPrestamo');
    this.ensureControl('pagoConsumo');
    this.ensureControl('pagoVisa');
    this.ensureControl('pagoExtra');
    this.ensureControl('adquisicionBienes');
    this.ensureControl('transporte');
    this.ensureControl('combustible');
    this.ensureControl('pension');
    this.ensureControl('otrosGastos');
    this.ensureControl('totalEgresos');
    // Crear los arrays dinámicos
    this.ensureArray('aportantes');
    this.ensureArray('tarjetas');
    this.ensureArray('visas');
    this.ensureArray('prestamos');
    // Crea los controles si no existen
    this.ensureControl('propiedadNombrePropia');
    this.ensureControl('propiedadNombrePadres');
    this.ensureControl('propiedadNombrePareja');
    this.ensureControl('propiedadNombreAmbos');

    this.ensureArray('bienesInmuebles');
    this.ensureArray('vehiculos');

    // ==== NUEVOS CAMPOS: REFERENCIAS CREDITICIAS Y JUDICIALES ====
    this.ensureControl('demandaJudicial');
    this.ensureControl('antecedentePoliciaco');
    this.ensureControl('antecedentePenal');
    this.ensureControl('haDemandadoPersona');
    this.ensureControl('haDemandadoEmpresa');
    this.ensureControl('haRecibidoDenuncia');
    this.ensureControl('poseeArmas');
    this.ensureControl('licenciaArmas');
    this.ensureControl('haEstadoDetenido');
    this.ensureControl('poseeProcesoLegal');
    this.ensureControl('registroBuro');
    this.ensureControl('registroInfornet');
    this.ensureControl('poseeOtraDeuda');
    this.ensureControl('esFiador');
    this.ensureControl('comentariosReferencias');
    this.form.valueChanges.subscribe(values => {
      const keys = [
        'hipoteca', 'alquiler', 'mantenimiento', 'seguridad', 'agua', 'luz', 'gas', 'internet', 'telefonoFijo', 'cable',
        'alimentacion', 'serviciosDomesticos', 'extraccionDesechos', 'recreacion', 'vestuario', 'medicamentos',
        'estudiosPropios', 'estudiosTerceros', 'ahorro', 'pagoTarjeta', 'pagoPrestamo', 'pagoConsumo', 'pagoVisa',
        'pagoExtra', 'adquisicionBienes', 'transporte', 'combustible', 'pension', 'otrosGastos'
      ];
      const total = keys.reduce((sum, key) => sum + (parseFloat(values[key]) || 0), 0);
      this.form.get('totalEgresos')?.setValue(total, { emitEvent: false });
    });
    this.form.valueChanges.subscribe(values => {
      const aportantes = this.form.get('aportantes') as FormArray;
      let totalAportantes = 0;

      if (aportantes && aportantes.length > 0) {
        aportantes.controls.forEach((ap) => {
          const ingreso = parseFloat(ap.get('ingreso')?.value) || 0;
          totalAportantes += ingreso;
        });
      }

      // Asigna solo el total de aportantes
      this.form.get('ingresoTotalFamiliar')?.setValue(totalAportantes, { emitEvent: false });
    });
  }

  // Helpers
  private ensureControl(name: string) {
    if (!this.form.get(name)) this.form.addControl(name, this.fb.control(''));
  }
  private ensureArray(name: string) {
    if (!this.form.get(name)) this.form.addControl(name, this.fb.array([]));
  }

  // Getters
  get aportantes(): FormArray { return this.form.get('aportantes') as FormArray; }
  get tarjetas(): FormArray { return this.form.get('tarjetas') as FormArray; }
  get visas(): FormArray { return this.form.get('visas') as FormArray; }
  get prestamos(): FormArray { return this.form.get('prestamos') as FormArray; }



  // CRUD dinámico
  agregarAportante() {
    this.aportantes.push(this.fb.group({
      nombre: [''], parentesco: [''], puesto: [''], ingreso: ['']
    }));

  }
  eliminarAportante(i: number) { this.aportantes.removeAt(i); }

  agregarTarjeta() {
    this.tarjetas.push(this.fb.group({
      institucion: [''], credito: [''], deuda: [''],
      pagoMensual: [''], estatus: ['']
    }));

  }
  eliminarTarjeta(i: number) { this.tarjetas.removeAt(i); }

  agregarVisa() {
    this.visas.push(this.fb.group({
      institucion: [''], valorTotal: [''], valorDeuda: [''], valorCuotas: ['']
    }));

  }
  eliminarVisa(i: number) { this.visas.removeAt(i); }

  agregarPrestamo() {
    this.prestamos.push(this.fb.group({
      institucion: [''], credito: [''], deuda: [''], pago: [''], motivo: ['']
    }));

  }
  eliminarPrestamo(i: number) { this.prestamos.removeAt(i); }
  // ======= Getters =======
  get bienesInmuebles(): FormArray {
    return this.form.get('bienesInmuebles') as FormArray;
  }
  get vehiculos(): FormArray {
    return this.form.get('vehiculos') as FormArray;
  }

  // ======= Métodos para Bienes Inmuebles =======
  agregarInmueble() {
    const inmuebleGroup = this.fb.group({
      tipoPropiedad: [''],
      ubicacion: [''],
      propietario: [''],
      valorAproximado: ['']
    });
    this.bienesInmuebles.push(inmuebleGroup);
  }

  eliminarInmueble(index: number) {
    this.bienesInmuebles.removeAt(index);
  }

  // ======= Métodos para Vehículos =======
  agregarVehiculo() {
    const vehiculoGroup = this.fb.group({
      marca: [''],
      linea: [''],
      modelo: [''],
      color: [''],
      propietario: [''],
      asegurado: ['']
    });
    this.vehiculos.push(vehiculoGroup);
  }

  eliminarVehiculo(index: number) {
    this.vehiculos.removeAt(index);
  }
}
