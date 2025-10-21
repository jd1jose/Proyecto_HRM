import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { AspectosGeneralesStepComponent } from './aspectos-generales-step.component';

describe('AspectosGeneralesStepComponent', () => {
  let component: AspectosGeneralesStepComponent;
  let fixture: ComponentFixture<AspectosGeneralesStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AspectosGeneralesStepComponent],
      providers: [FormBuilder]
    }).compileComponents();

    fixture = TestBed.createComponent(AspectosGeneralesStepComponent);
    component = fixture.componentInstance;
    const fb = TestBed.inject(FormBuilder);
    component.form = fb.group({
      nombreCompleto: [''],
      puestoSolicita: [''],
      pretensionSalarial: [''],
      profesion: [''],
      lugarNacimiento: [''],
      fechaNacimiento: [''],
      edadActual: [''],
      estatura: [''],
      grupoSanguineo: [''],
      direccionCompleta: [''],
      telefonoContacto: [''],
      contactoEmergencia: [''],
      estadoCivil: [''],
      viveCon: [''],
      dependientes: [''],
      dpi: [''],
      nit: [''],
      igss: [''],
      irtra: [''],
      licenciaTipo: [''],
      documentoTrabajo: [''],
      medioTransporte: ['']
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
