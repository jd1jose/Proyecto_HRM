import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ReferenciasLaboralesStepComponent } from './referencias-laborales-step.component';

describe('ReferenciasLaboralesStepComponent', () => {
  let component: ReferenciasLaboralesStepComponent;
  let fixture: ComponentFixture<ReferenciasLaboralesStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReferenciasLaboralesStepComponent],
      providers: [FormBuilder]
    }).compileComponents();

    fixture = TestBed.createComponent(ReferenciasLaboralesStepComponent);
    component = fixture.componentInstance;
    const fb = TestBed.inject(FormBuilder);
    component.form = fb.group({
      empresaNombre: [''],
      empresaDireccion: [''],
      empresaTelefono: [''],
      puestoDesempenado: [''],
      salarioDevengado: [''],
      fechaIngreso: [''],
      fechaSalida: [''],
      funciones: [''],
      jefeNombre: [''],
      jefePuesto: [''],
      motivoRetiro: [''],
      sePuedeReferenciar: ['']
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
