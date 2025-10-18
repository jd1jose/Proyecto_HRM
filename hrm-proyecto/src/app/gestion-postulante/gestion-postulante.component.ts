import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gestion-postulante',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './gestion-postulante.component.html',
  styleUrl: './gestion-postulante.component.css'
})
export class GestionPostulanteComponent implements OnInit {
  postulanteForm!: FormGroup;
  vacantes = ['Asistente Administrativo', 'Desarrollador Junior', 'Analista de RRHH'];
  educacion = ['Secundaria', 'Universitario', 'Postgrado'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.postulanteForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      vacante: ['', Validators.required],
      educacion: ['', Validators.required],
      experiencia: ['']
    });
  }

  guardar() {
    if (this.postulanteForm.valid) {
      console.log('✅ Postulante registrado:', this.postulanteForm.value);
      alert('Postulante guardado correctamente');
      this.postulanteForm.reset();
    } else {
      alert('⚠️ Complete los campos obligatorios');
    }
  }
}
