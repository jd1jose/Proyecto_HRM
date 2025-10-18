import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-historial-academico',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './historial-academico.component.html',
  styleUrls: ['./historial-academico.component.css']
})
export class HistorialAcademicoComponent implements OnInit {

  @Input() form!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // Crear los form arrays si no existen
    if (!this.form.get('universitario')) this.form.addControl('universitario', this.fb.array([]));
    if (!this.form.get('diversificado')) this.form.addControl('diversificado', this.fb.array([]));
    if (!this.form.get('primaria')) this.form.addControl('primaria', this.fb.array([]));
    if (!this.form.get('tecnico')) this.form.addControl('tecnico', this.fb.array([]));
    if (!this.form.get('conocimientosGenerales')) {
      this.form.addControl('conocimientosGenerales', this.fb.group({
        estudiaActualmente: [''],
        horarioAsistencia: [''],
        habilidades: [''],
        especializacion: [''],
        idioma: [''],
        vehiculos: [''],
        maquinaria: [''],
        deseaContinuar: [''],
        motivoContinuar: ['']
      }));
    }


  }

  // ==== Getters para los arrays ====
  get universitario(): FormArray {
    return this.form.get('universitario') as FormArray;
  }

  get diversificado(): FormArray {
    return this.form.get('diversificado') as FormArray;
  }

  get primaria(): FormArray {
    return this.form.get('primaria') as FormArray;
  }
  get tecnico(): FormArray {
    return this.form.get('tecnico') as FormArray;
  }

  // ==== Métodos de Agregar ====
  agregarUniversitario(): void {
    const nuevo = this.fb.group({
      nombre: [''],
      carrera: [''],
      anioInicio: [''],
      anioFin: [''],
      editando: [true]
    });
    this.universitario.push(nuevo);
  }

  agregarDiversificado(): void {
    const nuevo = this.fb.group({
      institucion: [''],
      titulo: [''],
      anio: [''],
      editando: [true]
    });
    this.diversificado.push(nuevo);
  }

  agregarPrimaria(): void {
    const nuevo = this.fb.group({
      institucion: [''],
      diploma: [''],
      anio: [''],
      editando: [true]
    });
    this.primaria.push(nuevo);
  }
  agregarTecnico(): void {
    const nuevo = this.fb.group({
      institucion: [''],
      diploma: [''],
      anio: [''],
      editando: [true]
    });
    this.tecnico.push(nuevo);
  }

  // ==== Métodos de Eliminar ====
  eliminarUniversitario(index: number): void {
    this.universitario.removeAt(index);
  }

  eliminarDiversificado(index: number): void {
    this.diversificado.removeAt(index);
  }

  eliminarPrimaria(index: number): void {
    this.primaria.removeAt(index);
  }
  eliminarTecnico(index: number): void {
    this.tecnico.removeAt(index);
  }

  // ==== Métodos de Editar / Guardar ====
  editarFila(array: 'universitario' | 'diversificado' | 'primaria' | 'tecnico', index: number): void {
    (this[array].at(index) as FormGroup).patchValue({ editando: true });
  }

  guardarFila(array: 'universitario' | 'diversificado' | 'primaria' | 'tecnico', index: number): void {
    const grupo = this[array].at(index) as FormGroup;

    // Validación opcional para el año (solo si se completó)
    if (array == 'universitario') {
      const anioInicio = grupo.get('anioInicio')?.value;
      if (anioInicio && (anioInicio < 1900 || anioInicio > new Date().getFullYear() + 1)) {
        alert('⚠️ Ingrese un año válido (1900 - año actual)');
        return;
      }
      const anioFinal = grupo.get('anioFin')?.value;
      if (anioFinal && (anioFinal < 1900 || anioFinal > new Date().getFullYear() + 1)) {
        alert('⚠️ Ingrese un año válido (1900 - año actual)');
        return;
      }
    } else {
      const anio = grupo.get('anio')?.value;
      if (anio && (anio < 1900 || anio > new Date().getFullYear() + 1)) {
        alert('⚠️ Ingrese un año válido (1900 - año actual)');
        return;
      }
    }

    grupo.patchValue({ editando: false });
  }
}
