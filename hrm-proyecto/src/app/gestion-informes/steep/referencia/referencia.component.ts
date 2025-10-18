import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-referencia',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './referencia.component.html',
  styleUrls: ['./referencia.component.css']
})
export class ReferenciaComponent implements OnInit {

  @Input() form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Crear los tres form arrays principales
    this.form.addControl('referenciasPersonales', this.fb.array([]));
    this.form.addControl('referenciasFamiliares', this.fb.array([]));
    this.form.addControl('referenciasVecindario', this.fb.array([]));
  }

  // === REFERENCIAS PERSONALES ===
  get referenciasPersonales(): FormArray {
    return this.form.get('referenciasPersonales') as FormArray;
  }

  agregarReferenciaPersonal(): void {
    const ref = this.fb.group({
      nombre: ['', Validators.required],
      telefono: [''],
      edad: [''],
      tiempoConocerse: [''],
      comoSeConocieron: [''],
      descripcion: [''],
      consumeAlcohol: [''],
      fuma: [''],
      personaConflictiva: [''],
      recomienda: ['']
    });
    this.referenciasPersonales.push(ref);
  }

  eliminarReferenciaPersonal(i: number): void {
    this.referenciasPersonales.removeAt(i);
  }

  // === REFERENCIAS FAMILIARES ===
  get referenciasFamiliares(): FormArray {
    return this.form.get('referenciasFamiliares') as FormArray;
  }

  agregarReferenciaFamiliar(): void {
    const ref = this.fb.group({
      nombre: ['', Validators.required],
      parentesco: [''],
      telefono: [''],
      edad: [''],
      profesion: [''],
      considera: [''],
      consumeAlcohol: [''],
      fuma: [''],
      conflictiva: [''],
      recomienda: ['']
    });
    this.referenciasFamiliares.push(ref);
  }

  eliminarReferenciaFamiliar(i: number): void {
    this.referenciasFamiliares.removeAt(i);
  }

  // === REFERENCIAS VECINDARIO ===
  get referenciasVecindario(): FormArray {
    return this.form.get('referenciasVecindario') as FormArray;
  }

  agregarReferenciaVecino(): void {
    const ref = this.fb.group({
      direccion: [''],
      atendio: [''],
      tiempoVecino: [''],
      descripcion: [''],
      consumeAlcohol: [''],
      conflictiva: [''],
      consumeDrogas: [''],
      sabeDondeTrabajo: [''],
      recomienda: ['---']
    });
    this.referenciasVecindario.push(ref);
  }

  eliminarReferenciaVecino(i: number): void {
    this.referenciasVecindario.removeAt(i);
  }

}
