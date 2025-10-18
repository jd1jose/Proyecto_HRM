import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-informacion-general',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './informacion-general.component.html',
  styleUrls: ['./informacion-general.component.css']
})
export class InformacionGeneralComponent implements OnInit, OnDestroy  {

  @Input() form!: FormGroup;

  private subs: Subscription[] = [];

  // Combos
  sexos = [
    { value: 'F', label: 'Femenino' },
    { value: 'M', label: 'Masculino' },
    { value: 'O', label: 'Otro' },
  ];

  estadosCiviles = ['Soltero(a)', 'Casado(a)', 'Divorciado(a)', 'Unido(a)', 'Viudo(a)'];

  tiposSangre = [
    'O−', 'O+', 'A−', 'A+', 'B−', 'B+', 'AB−', 'AB+'
  ];

  ngOnInit(): void {
    // Controles base
    this.form.addControl('nombreCompleto', this.fb.control('', [Validators.required, Validators.minLength(3)]));
    this.form.addControl('direccion', this.fb.control(''));
    this.form.addControl('sexo', this.fb.control('',Validators.required));
    this.form.addControl('edad', this.fb.control('', [Validators.min(0), Validators.max(120)]));
    this.form.addControl('fechaNacimiento', this.fb.control(''));
    this.form.addControl('lugarNacimiento', this.fb.control(''));
    this.form.addControl('cui', this.fb.control(''));
    this.form.addControl('extendida', this.fb.control(''));
    this.form.addControl('estadoCivil', this.fb.control(''));

    // Licencia de conducir (condicionales)
    this.form.addControl('licenciaConducir', this.fb.control('', Validators.required));
    this.form.addControl('licenciaTipo', this.fb.control({ value: '', disabled: true }));
    this.form.addControl('licenciaNumero', this.fb.control({ value: '', disabled: true }));
    this.form.addControl('licenciaVigencia', this.fb.control({ value: '', disabled: true }));

    // Documentos / identificaciones
    this.form.addControl('numeroDocumento', this.fb.control(''));
    this.form.addControl('nit', this.fb.control(''));
    this.form.addControl('igss', this.fb.control(''));
    this.form.addControl('irtra', this.fb.control(''));
    this.form.addControl('pasaporte', this.fb.control(''));
    this.form.addControl('visaAmericana',  this.fb.control('', Validators.required)); // sí/no

    // Contacto
    this.form.addControl('telCasa', this.fb.control(''));
    this.form.addControl('telCelular', this.fb.control(''));
    this.form.addControl('telEmergencia', this.fb.control(''));
    this.form.addControl('contactoEmergencia', this.fb.control(''));
    this.form.addControl('parentesco', this.fb.control(''));
    this.form.addControl('email', this.fb.control('', [Validators.email]));

    // Trabajo (condicionales)
    this.form.addControl('trabajaActualmente', this.fb.control('', Validators.required)); // sí/no
    this.form.addControl('empresa', this.fb.control({ value: '', disabled: true }));
    this.form.addControl('empresaSolicitante', this.fb.control(''));
    this.form.addControl('laboraParaLaEmpresa', this.fb.control('', Validators.required)); // sí/no
    this.form.addControl('puestoAplica', this.fb.control(''));

    // Otros
    this.form.addControl('medioTransporte', this.fb.control(''));
    this.form.addControl('religion', this.fb.control(''));
    this.form.addControl('tipoSangre', this.fb.control(''));
    this.form.addControl('estatura', this.fb.control('')); // puedes validar patrón si la quieres en cm
    this.form.addControl('peso', this.fb.control(''));     // idem para kg 
    this.form.addControl('cicatrices', this.fb.control(''));
    this.form.addControl('cabello', this.fb.control(''));
    this.form.addControl('tipoCabello', this.fb.control(''));
    this.form.addControl('apodo', this.fb.control(''));
    this.form.addControl('profesion', this.fb.control(''));
    this.form.addControl('pretension', this.fb.control(''));
    this.form.addControl('comentarios', this.fb.control(''));
  }

  constructor(private fb: FormBuilder) {}

  wireUpReactions(event: Event) {
    
  const value = (event.target as HTMLSelectElement).value === 'true';
    // Trabaja actualmente: habilita campos de empresa y "labora para la empresa"
        const emp = this.form.get('empresa')!;
        const labora = this.form.get('laboraParaLaEmpresa')!;
        if (value) {
          emp.enable(); labora.enable();
          emp.addValidators([Validators.required]);
          labora.addValidators([Validators.required]);
          // empresa solicitante puede ser opcional, depende del flujo; la dejo libre
        } else {
          emp.reset(); labora.reset(); 
          emp.disable(); labora.disable(); 
          emp.clearValidators(); labora.clearValidators(); 
        }
        emp.updateValueAndValidity();
        labora.updateValueAndValidity();
      
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }
onLicenciaChange(event: Event) {// licenciaTipo,licenciaNumero,licenciaVigencia
  const value = (event.target as HTMLSelectElement).value === 'true';
  const tipo = this.form.get('licenciaTipo')!;
  const num = this.form.get('licenciaNumero')!;
  const vig = this.form.get('licenciaVigencia')!;

  if (value) {
    tipo.enable(); num.enable(); vig.enable();
    tipo.addValidators([Validators.required]);
    num.addValidators([Validators.required]);
    vig.addValidators([Validators.required]);
  } else {
    tipo.reset(); num.reset(); vig.reset();
    tipo.disable(); num.disable(); vig.disable();
    tipo.clearValidators(); num.clearValidators(); vig.clearValidators();
  }

  tipo.updateValueAndValidity();
  num.updateValueAndValidity();
  vig.updateValueAndValidity();
}
}
