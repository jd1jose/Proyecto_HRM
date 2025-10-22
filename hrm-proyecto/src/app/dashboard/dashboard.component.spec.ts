/* tslint:disable:no-unused-variable */
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardComponent } from './dashboard.component';
import { VacantesService } from '../services/vacantes.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  const vacantesServiceStub = {
    listarVacantes: jasmine.createSpy('listarVacantes').and.returnValue(
      of({ items: [], total: 0, page: 1, size: 20 })
    ),
    obtenerVacante: jasmine.createSpy('obtenerVacante').and.returnValue(of({
      id: 1,
      puesto: '',
      descripcion: '',
      contacto: '',
      categoria: '',
      tipoContrato: '',
      experiencia: '',
      educacion: '',
      departamento: '',
      ciudad: '',
      cantidadVacantes: 1,
      salario: 0,
      tipoPago: '',
      estado: 'abierta',
      postulantes: []
    })),
    cerrarVacante: jasmine.createSpy('cerrarVacante').and.returnValue(
      of({
        id: 1,
        puesto: '',
        descripcion: '',
        contacto: '',
        categoria: '',
        tipoContrato: '',
        experiencia: '',
        educacion: '',
        departamento: '',
        ciudad: '',
        cantidadVacantes: 1,
        salario: 0,
        tipoPago: '',
        estado: 'confirmar_postulantes',
        postulantes: []
      })
    ),
    actualizarEstadoVacante: jasmine.createSpy('actualizarEstadoVacante').and.returnValue(
      of({
        id: 1,
        puesto: '',
        descripcion: '',
        contacto: '',
        categoria: '',
        tipoContrato: '',
        experiencia: '',
        educacion: '',
        departamento: '',
        ciudad: '',
        cantidadVacantes: 1,
        salario: 0,
        tipoPago: '',
        estado: 'cerrada',
        postulantes: []
      })
    ),
    generarInformeRiesgo: jasmine.createSpy('generarInformeRiesgo').and.returnValue(
      of({
        id: 1,
        puesto: '',
        descripcion: '',
        contacto: '',
        categoria: '',
        tipoContrato: '',
        experiencia: '',
        educacion: '',
        departamento: '',
        ciudad: '',
        cantidadVacantes: 1,
        salario: 0,
        tipoPago: '',
        estado: 'informe_riesgo',
        postulantes: []
      })
    )
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [DashboardComponent, RouterTestingModule],
        providers: [{ provide: VacantesService, useValue: vacantesServiceStub }]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
