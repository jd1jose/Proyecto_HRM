import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-fotografias',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './fotografias.component.html',
  styleUrls: ['./fotografias.component.css']
})
export class FotografiasComponent implements OnInit {

  @Input() form!: FormGroup;

  secciones = [
    { key: 'vivienda', titulo: 'Fotografías de la Vivienda' },
    { key: 'dpi', titulo: 'Documento Personal de Identificación (DPI)' },
    { key: 'rtu', titulo: 'Registro Tributario Unificado (RTU)' },
    { key: 'cgc', titulo: 'CGC - Sistema Público de Verificación de Títulos' },
    { key: 'mspas', titulo: 'MSPAS, Vacunación SARS-COV-2 (COVID-19)' },
    { key: 'recede', titulo: 'Registro Central de Detenidos - RECEDE' },
    { key: 'migracion', titulo: 'Instituto Guatemalteco de Migración – Arraigos' },
    { key: 'renas', titulo: 'Registro Nacional de Agresores Sexuales (RENAS)' },
    { key: 'antecedentes', titulo: 'Carencia de Antecedentes Penales y Policiacos' }
  ];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // Crear un FormArray para cada sección
    this.secciones.forEach(sec => {
      this.form.addControl(sec.key, this.fb.array([]));
    });
  }

  getArray(nombre: string): FormArray {
    return this.form.get(nombre) as FormArray;
  }

  // Manejo de carga de archivos
  onFileSelected(event: any, nombre: string): void {
    const files: FileList = event.target.files;
    const formArray = this.getArray(nombre);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        formArray.push(this.fb.group({
          nombre: file.name,
          archivo: e.target.result // Base64 para previsualización
        }));
      };
      reader.readAsDataURL(file);
    }
  }

  eliminarFoto(nombre: string, index: number): void {
    const formArray = this.getArray(nombre);
    formArray.removeAt(index);
  }
}
