import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { GestionVacanteComponent } from './gestion-vacante.component';
import { VacantesService } from '../services/vacantes.service';

describe('GestionVacanteComponent', () => {
  let component: GestionVacanteComponent;
  let fixture: ComponentFixture<GestionVacanteComponent>;

  const vacantesServiceStub = {
    crearVacante: jasmine.createSpy('crearVacante').and.returnValue(of({ id: 1 })),
    actualizarVacante: jasmine.createSpy('actualizarVacante').and.returnValue(of({ id: 1 }))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionVacanteComponent],
      providers: [{ provide: VacantesService, useValue: vacantesServiceStub }]
    }).compileComponents();

    fixture = TestBed.createComponent(GestionVacanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
