import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-informacion-laboral',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './informacion-laboral.component.html',
  styleUrls: ['./informacion-laboral.component.css']
})
export class InformacionLaboralComponent implements OnInit {
@Input() form!: FormGroup; // el formulario viene del padre (NO lo inicializamos aquí)

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Creamos los controles si no existen (usa el del padre)
    if (!this.form.get('seEncuentraLaborando')) {
      this.form.addControl('seEncuentraLaborando', this.fb.control(''));
    }

    if (!this.form.get('sostenEconomico')) {
      this.form.addControl('sostenEconomico', this.fb.control(''));
    }

    if (!this.form.get('ingresoAproximado')) {
      this.form.addControl('ingresoAproximado', this.fb.control(''));
    }

    if (!this.form.get('comentarioGeneral')) {
      this.form.addControl('comentarioGeneral', this.fb.control(''));
    }

    if (!this.form.get('empresas')) {
      this.form.addControl('empresas', this.fb.array([]));
    }
  }

  // Getter del FormArray
  get empresas(): FormArray {
    return this.form.get('empresas') as FormArray;
  }

  // Agregar nueva empresa
  agregarEmpresa(): void {
    const empresaGroup = this.fb.group({
      nombreEmpresa: [''],
      direccion: [''],
      telefono: [''],
      ultimoCargo: [''],
      constanciaLaboral: [''],
      jefeInmediato: [''],
      telefonoJefe: [''],
      fechaInicio: [''],
      fechaFinal: [''],
      salarioFinal: [''],
      motivoSeparacion: [''],
      referencia: this.fb.group({
        informante: [''],
        cargoInformante: [''],
        telefonoInformante: [''],
        correoInformante: [''],
        indicaCandidato: [''],
        empresa: [''],
        periodoLaboral: [''],
        ultimoCargo: [''],
        motivoSeparacion: [''],
        llamadaAtencion: [''],
        aceptaRecontratacion: [''],
        comentario: ['']
      })
    });

    this.empresas.push(empresaGroup);
  }

  eliminarEmpresa(index: number): void {
    this.empresas.removeAt(index);
  }
}
