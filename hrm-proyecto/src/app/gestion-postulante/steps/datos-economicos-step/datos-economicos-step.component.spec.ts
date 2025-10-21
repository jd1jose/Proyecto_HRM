import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { DatosEconomicosStepComponent } from './datos-economicos-step.component';

describe('DatosEconomicosStepComponent', () => {
  let component: DatosEconomicosStepComponent;
  let fixture: ComponentFixture<DatosEconomicosStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosEconomicosStepComponent],
      providers: [FormBuilder]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosEconomicosStepComponent);
    component = fixture.componentInstance;
    const fb = TestBed.inject(FormBuilder);
    component.form = fb.group({
      otrosIngresos: [''],
      descripcionIngresos: [''],
      conyugeTrabaja: [''],
      casaPropia: [''],
      pagaRenta: [''],
      tieneDeudas: [''],
      deudaCobroJudicial: [''],
      abonoMensual: ['']
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

