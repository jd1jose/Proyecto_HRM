import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, } from '@angular/forms';
import { RouterModule } from '@angular/router';
// 🔹 Importaciones Angular Material
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { InformacionGeneralComponent } from './steep/informacion-general/informacion-general.component';
import { DatosFamiliaresComponent } from './steep/datos-familiares/datos-familiares.component';
import { SaludComponent } from './steep/salud/salud.component';
import { HistorialAcademicoComponent } from './steep/historial-academico/historial-academico.component';
import { AntecedentesComponent } from './steep/antecedentes/antecedentes.component';
import { InformacionLaboralComponent } from './steep/informacion-laboral/informacion-laboral.component';
import { InformacionEconomicaComponent } from './steep/informacion-economica/informacion-economica.component';
import { ViviendaComponent } from './steep/vivienda/vivienda.component';
import { RedesComponent } from './steep/redes/redes.component';
import { ReferenciaComponent } from './steep/referencia/referencia.component';
import { EntrevistaComponent } from './steep/entrevista/entrevista.component';
import { FotografiasComponent } from './steep/fotografias/fotografias.component';

type Estudio = { nombre: string; titulo: string; anio: string };
type TipoEstudio = 'universidad' | 'diversificado' | 'primaria';
@Component({
  selector: 'app-gestion-informes',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    InformacionGeneralComponent,
    DatosFamiliaresComponent,
    SaludComponent,
    HistorialAcademicoComponent,
    AntecedentesComponent,
    InformacionLaboralComponent,
    InformacionEconomicaComponent,
    ViviendaComponent,
    RedesComponent,
    ReferenciaComponent,
    EntrevistaComponent,
    FotografiasComponent
  ],
  templateUrl: './gestion-informes.component.html',
  styleUrls: ['./gestion-informes.component.css']
})
export class GestionInformesComponent implements OnInit {

  form!: FormGroup;
 
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      generales: this.fb.group({}),
      familiares: this.fb.group({}),
      salud: this.fb.group({}),
      academico: this.fb.group({}),
      antecedentes: this.fb.group({}),
      laboral: this.fb.group({}),
      economico: this.fb.group({}),
      propiedades: this.fb.group({}),
      redes: this.fb.group({}),
      referencias:this.fb.group({}),
      entrevista:this.fb.group({}),
      anexos:this.fb.group({}),
    });
  }

  guardarInforme() {
    console.log('✅ Informe completo:', this.form.value);
    alert('Informe guardado exitosamente');
  }
}
