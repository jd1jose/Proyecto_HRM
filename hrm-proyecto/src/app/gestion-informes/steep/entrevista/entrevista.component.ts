import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-entrevista',
  standalone:true,
   imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './entrevista.component.html',
  styleUrls: ['./entrevista.component.css']
})
export class EntrevistaComponent implements OnInit {

@Input() form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // === Aspectos al momento de la entrevista ===
    this.form.addControl('presentacionHora', this.fb.control('', Validators.required));
    this.form.addControl('comentarioPresentacion', this.fb.control(''));
    this.form.addControl('vestimentaAdecuada', this.fb.control(''));

    // === Desarrollo verbal ===
    this.form.addControl('desarrolloVerbal', this.fb.control(''));

    // === Objetivos personales ===
    this.form.addControl('objetivoCortoPersonal', this.fb.control(''));
    this.form.addControl('objetivoMedianoPersonal', this.fb.control(''));
    this.form.addControl('objetivoLargoPersonal', this.fb.control(''));

    // === Objetivos laborales ===
    this.form.addControl('objetivoCortoLaboral', this.fb.control(''));
    this.form.addControl('objetivoMedianoLaboral', this.fb.control(''));
    this.form.addControl('objetivoLargoLaboral', this.fb.control(''));
    this.form.addControl('esperaEmpresa', this.fb.control(''));

    // === Aspectos relevantes ===
    this.form.addControl('tieneFamiliares', this.fb.control('No'));

    // === Observaciones laborales ===
    this.form.addControl('presentoDocumentacion', this.fb.control(''));
    this.form.addControl('careceAntecedentes', this.fb.control(''));
    this.form.addControl('alteracionesDocumentacion', this.fb.control(''));
  }
}
