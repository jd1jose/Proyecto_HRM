import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-gestion-vacante',
  standalone: true, // 👈 asegúrate de que esté activado
  imports: [CommonModule, ReactiveFormsModule], // 👈 agrega aquí
  templateUrl: './gestion-vacante.component.html'
})
export class GestionVacanteComponent implements OnInit {
  vacanteForm!: FormGroup;

  categorias = ['Administración', 'Tecnología', 'Ventas', 'Recursos Humanos'];
  tiposContrato = ['Tiempo Completo', 'Medio Tiempo', 'Temporal', 'Prácticas'];
  experiencia = ['Sin experiencia', '1-2 años', '3-5 años', 'Más de 5 años'];
  educacion = ['Secundaria', 'Universitario', 'Postgrado', 'Doctorado'];
  departamentos = ['Guatemala', 'Sacatepéquez', 'Quetzaltenango'];
  ciudades = ['Ciudad de Guatemala', 'Antigua', 'Quetzaltenango'];
  tipoPago = ['Mensual', 'Quincenal', 'Por hora'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.vacanteForm = this.fb.group({
      puesto: ['', Validators.required],
      descripcion: ['', Validators.required],
      contacto: ['', [Validators.required, Validators.email]],
      categoria: ['', Validators.required],
      tipoContrato: ['', Validators.required],
      experiencia: ['', Validators.required],
      educacion: ['', Validators.required],
      departamento: ['', Validators.required],
      ciudad: ['', Validators.required],
      cantidadVacantes: [1, [Validators.required, Validators.min(1)]],
      salario: ['', Validators.required],
      tipoPago: ['', Validators.required],
    });
  }

  guardar() {
    if (this.vacanteForm.valid) {
      console.log('Vacante registrada:', this.vacanteForm.value);
      alert('✅ Vacante registrada con éxito');
      this.vacanteForm.reset();
    } else {
      alert('⚠️ Por favor complete todos los campos obligatorios');
    }
  }
}
