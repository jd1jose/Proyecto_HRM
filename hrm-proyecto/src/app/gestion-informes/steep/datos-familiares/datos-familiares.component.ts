import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-datos-familiares',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './datos-familiares.component.html',
  styleUrls: ['./datos-familiares.component.css']
})
export class DatosFamiliaresComponent implements OnInit , OnDestroy {

  @Input() form!: FormGroup;
  private subs: Subscription[] = [];

  constructor(private fb: FormBuilder) {}
//residenciaMadre residenciaPareja residencia
  ngOnInit(): void {
    // === Padre ===
    this.form.addControl('nombrePadre', this.fb.control('', Validators.required));
    this.form.addControl('edadPadre', this.fb.control(''));
    this.form.addControl('fechaNacimientoPadre', this.fb.control(''));
    this.form.addControl('originarioPadre', this.fb.control(''));
    this.form.addControl('vivePadre', this.fb.control(''));
    this.form.addControl('viveConPadre', this.fb.control(''));
    this.form.addControl('escolaridadPadre', this.fb.control(''));
    this.form.addControl('profesionPadre', this.fb.control(''));
    this.form.addControl('residenciaPadre', this.fb.control(''));
    // === Madre ===
    this.form.addControl('nombreMadre', this.fb.control('', Validators.required));
    this.form.addControl('edadMadre', this.fb.control(''));
    this.form.addControl('fechaNacimientoMadre', this.fb.control(''));
    this.form.addControl('originarioMadre', this.fb.control(''));
    this.form.addControl('viveMadre', this.fb.control(''));
    this.form.addControl('viveConMadre', this.fb.control(''));
    this.form.addControl('escolaridadMadre', this.fb.control(''));
    this.form.addControl('profesionMadre', this.fb.control(''));
    this.form.addControl('residenciaMadre', this.fb.control(''));
    // === Pareja ===
    this.form.addControl('resideEnPareja', this.fb.control(''));
    this.form.addControl('nombrePareja', this.fb.control(''));
    this.form.addControl('edadPareja', this.fb.control(''));
    this.form.addControl('fechaNacimientoPareja', this.fb.control(''));
    this.form.addControl('originarioPareja', this.fb.control(''));
    this.form.addControl('vivenJuntos', this.fb.control(''));
    this.form.addControl('tiempoRelacion', this.fb.control(''));
    this.form.addControl('escolaridadPareja', this.fb.control(''));
    this.form.addControl('profesionPareja', this.fb.control(''));
    this.form.addControl('residenciaPareja', this.fb.control(''));
    this.form.addControl('comentarios', this.fb.control(''));
    // === Hermanos (FormArray) ===
    this.form.addControl('hermanos', this.fb.array([]));

    // === Hijos (FormArray) ===
    this.form.addControl('hijos', this.fb.array([]));
  }

  get hermanos(): FormArray {
    return this.form.get('hermanos') as FormArray;
  }

  get hijos(): FormArray {
    return this.form.get('hijos') as FormArray;
  }

  agregarHermano() {
    const grupo = this.fb.group({
      nombre: [''],
      edad: [''],
      fechaNacimiento: [''],
      originario: [''],
      viveCon: [''],
      escolaridad: [''],
      estadoCivil: [''],
      hijos: [''],
      profesion: [''],
      residencia: ['']
    });
    this.hermanos.push(grupo);
  }

  eliminarHermano(index: number) {
    this.hermanos.removeAt(index);
  }

  agregarHijo() {
    const grupo = this.fb.group({
      nombre: [''],
      edad: [''],
      fechaNacimiento: [''],
      originario: [''],
      viveCon: [''],
      resideEn: ['']
    });
    this.hijos.push(grupo);
  }

  eliminarHijo(index: number) {
    this.hijos.removeAt(index);
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }
}