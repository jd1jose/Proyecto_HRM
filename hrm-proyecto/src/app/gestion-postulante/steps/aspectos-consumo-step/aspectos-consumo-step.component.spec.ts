import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { AspectosConsumoStepComponent } from './aspectos-consumo-step.component';

describe('AspectosConsumoStepComponent', () => {
  let component: AspectosConsumoStepComponent;
  let fixture: ComponentFixture<AspectosConsumoStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AspectosConsumoStepComponent],
      providers: [FormBuilder]
    }).compileComponents();

    fixture = TestBed.createComponent(AspectosConsumoStepComponent);
    component = fixture.componentInstance;
    const fb = TestBed.inject(FormBuilder);
    component.form = fb.group({
      tieneTatuajes: [''],
      bebe: [''],
      bebeFrecuencia: [''],
      fuma: [''],
      fumaFrecuencia: [''],
      puedeViajar: [''],
      cambiarResidencia: [''],
      afiliadoSindicato: [''],
      consumioDrogas: [''],
      tieneAntecedentes: [''],
      fechaDisponibilidad: [''],
      religion: ['']
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
