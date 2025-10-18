import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-salud',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './salud.component.html',
  styleUrls: ['./salud.component.css']
})
export class SaludComponent implements OnInit {

  @Input() form!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    if (!this.form) {
      this.form = this.fb.group({});
    }

    const campos = [
      // 🏥 DATOS CLÍNICOS
      'serviciosMedicos', 'frecuenciaMedico', 'serviciosConQueCuenta',

      // 🧠 DESCRIPCIÓN FÍSICA Y SALUD
      'enfermedadCongenita', 'deformidadCongenita', 'alergias', 'enfOjos',
      'usaLentes', 'deberiaUsarLentes', 'oyeBien', 'usaAparatosOir',
      'enfOidos', 'enfDentales', 'enfTiroides', 'enfRespiratorias',
      'enfPulmones', 'enfCorazon', 'tensionArterial', 'sistemaCirculatorio',
      'enfDigestivas', 'enfHigado', 'nivelesAzucar', 'alteracionesMetabolicas',
      'enfRenales', 'infeccionesUrinarias', 'enfPiel', 'enfInfecciosas',
      'ingresosHospitalarios', 'operaciones', 'accidentes', 'fracturas',
      'secuelas', 'enfCronicas', 'enfContagiosas', 'tratamientosPsicologicos',
      'enfTransmisionSexual', 'tomaMedicamentos', 'medicamentosPermanentes',
      'enfermaFrecuencia', 'desmayos', 'tratamientoMedico',
      'asistioUltimasSemanas',

      // 🧬 COVID-19
      'contactoCovid', 'sintomasCovid', 'positivoCovid', 'fechaContagio',
      'familiarCovid', 'fechaContagioFamiliar', 'vacunadoCovid',
      'cantidadDosis', 'tipoVacuna',

      // 👩‍⚕️ MUJERES
      'problemasGinecologicos', 'problemasMamarios',
      'examenRutina', 'revisionesGinecologicas', 'embarazada',
      // 👕 MEDIDAS Y TALLAJE
      'tallaCamisa', 'tallaPantalon', 'tallaCalzado', 'altura', 'peso', 'complexion',
      // 🚬 CONSUMO DE TABACO
      'ustedFuma', 'fumaActualmente', 'fumabaAnteriormente', 'haFumado',

      // 🍷 CONSUMO DE BEBIDAS ALCOHÓLICAS
      'ingiereAlcohol', 'actualmenteBebe', 'haIngeridoAlcohol', 'exAlcoholico',

      // 💊 CONSUMO DE DROGAS PSICOACTIVAS
      'consumeDrogas', 'conoceDrogas', 'haProbadoDrogas',

      // 🏃 HÁBITOS, ACTIVIDAD FÍSICA Y SUEÑO
      'practicaDeporte', 'deportePractica', 'frecuenciaEjercicio', 'clubDeportivo',
      'horasSueno', 'padeceInsomnio', 'tomaSomniferos', 'tareasDomesticas', 'actividadesTiempoLibre'

    ];

    campos.forEach(campo => this.ensureControl(campo));
  }

  private ensureControl(nombre: string) {
    if (!this.form.get(nombre)) {
      this.form.addControl(nombre, this.fb.control(''));
    }
  }
}
