import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatStepper } from '@angular/material/stepper';
import { of } from 'rxjs';
import { GestionPostulanteComponent } from './gestion-postulante.component';
import { PostulantesService } from '../services/postulantes.service';

describe('GestionPostulanteComponent', () => {
  let component: GestionPostulanteComponent;
  let fixture: ComponentFixture<GestionPostulanteComponent>;

  const postulantesServiceStub = {
    registrarPostulante: jasmine.createSpy('registrarPostulante').and.returnValue(of({}))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionPostulanteComponent, NoopAnimationsModule],
      providers: [{ provide: PostulantesService, useValue: postulantesServiceStub }]
    }).compileComponents();

    fixture = TestBed.createComponent(GestionPostulanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should configure 8 steps', () => {
    expect(component.steps.length).toBe(8);
    const headers = fixture.debugElement.queryAll(By.css('mat-step-header'));
    expect(headers.length).toBe(8);
  });

  it('should advance and go back using stepper controls', () => {
    const stepperDebug = fixture.debugElement.query(By.directive(MatStepper));
    const stepper = stepperDebug.componentInstance as MatStepper;

    const nextButton = fixture.debugElement.query(By.css('button[matStepperNext]')).nativeElement as HTMLButtonElement;
    nextButton.click();
    fixture.detectChanges();
    expect(stepper.selectedIndex).toBe(1);

    const prevButton = fixture.debugElement.query(By.css('button[matStepperPrevious]')).nativeElement as HTMLButtonElement;
    prevButton.click();
    fixture.detectChanges();
    expect(stepper.selectedIndex).toBe(0);
  });
});

