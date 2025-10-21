import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ReferenciasPersonalesStepComponent } from './referencias-personales-step.component';

describe('ReferenciasPersonalesStepComponent', () => {
  let component: ReferenciasPersonalesStepComponent;
  let fixture: ComponentFixture<ReferenciasPersonalesStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReferenciasPersonalesStepComponent],
      providers: [FormBuilder]
    }).compileComponents();

    fixture = TestBed.createComponent(ReferenciasPersonalesStepComponent);
    component = fixture.componentInstance;
    const fb = TestBed.inject(FormBuilder);
    component.form = fb.group({
      nombre: [''],
      telefono: [''],
      tiempoConocerlo: ['']
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
