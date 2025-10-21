import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { DatosFamiliaresStepComponent } from './datos-familiares-step.component';

describe('DatosFamiliaresStepComponent', () => {
  let component: DatosFamiliaresStepComponent;
  let fixture: ComponentFixture<DatosFamiliaresStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosFamiliaresStepComponent],
      providers: [FormBuilder]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosFamiliaresStepComponent);
    component = fixture.componentInstance;
    const fb = TestBed.inject(FormBuilder);
    component.form = fb.group({
      padreNombre: [''],
      padreEdad: [''],
      padreVive: [''],
      padreViveConUsted: [''],
      madreNombre: [''],
      madreEdad: [''],
      madreVive: [''],
      madreViveConUsted: [''],
      conyugeNombre: [''],
      conyugeEdad: [''],
      conyugeVive: [''],
      conyugeViveConUsted: [''],
      conyugeOcupacion: [''],
      hijosNombre: [''],
      hijosEdad: [''],
      hermanosNombre: [''],
      hermanosEdad: ['']
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
