import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { DatosAcademicosStepComponent } from './datos-academicos-step.component';

describe('DatosAcademicosStepComponent', () => {
  let component: DatosAcademicosStepComponent;
  let fixture: ComponentFixture<DatosAcademicosStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosAcademicosStepComponent],
      providers: [FormBuilder]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosAcademicosStepComponent);
    component = fixture.componentInstance;
    const fb = TestBed.inject(FormBuilder);
    component.form = fb.group({
      primariaEstablecimiento: [''],
      primariaAnios: [''],
      basicosEstablecimiento: [''],
      basicosAnios: [''],
      diversificadoEstablecimiento: [''],
      diversificadoCarrera: [''],
      diversificadoAnios: [''],
      tecnicaEstablecimiento: [''],
      tecnicaCarrera: [''],
      tecnicaAnios: [''],
      universidadCuenta: [''],
      universidadDetalle: [''],
      postgradoCuenta: [''],
      postgradoDetalle: [''],
      idiomas: [''],
      software: [''],
      maquinas: [''],
      otrasFunciones: [''],
      experienciaLaboral: ['']
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
