import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { SaludStepComponent } from './salud-step.component';

describe('SaludStepComponent', () => {
  let component: SaludStepComponent;
  let fixture: ComponentFixture<SaludStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaludStepComponent],
      providers: [FormBuilder]
    }).compileComponents();

    fixture = TestBed.createComponent(SaludStepComponent);
    component = fixture.componentInstance;
    const fb = TestBed.inject(FormBuilder);
    component.form = fb.group({
      estadoSalud: [''],
      padecioCovid: [''],
      tieneVacunacionCovid: [''],
      numeroDosisCovid: [''],
      sufrioFracturas: [''],
      sufrioOperacion: [''],
      enfermedadCronica: [''],
      enfermaFrecuencia: [''],
      practicaDeportes: [''],
      perteneceClub: [''],
      tienePasatiempo: [''],
      metaVida: ['']
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
