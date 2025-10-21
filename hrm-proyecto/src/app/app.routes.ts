import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GestionVacanteComponent } from './gestion-vacante/gestion-vacante.component';
import { GestionPostulanteComponent } from './gestion-postulante/gestion-postulante.component';
import { GestionInformesComponent } from './gestion-informes/gestion-informes.component';
import { UsuariosTemporalesComponent } from './usuarios-temporales/usuarios-temporales.component';
import { AsignarPostulantesComponent } from './vacantes-asignacion/asignar-postulantes.component';

export const routes: Routes = [
       { path: 'login', component: LoginComponent },
       { path: 'bandeja/principal', component: DashboardComponent },
       { path: 'vacantes/:id/asignaciones', component: AsignarPostulantesComponent },
       { path: 'vacantes', component: GestionVacanteComponent },
       { path: 'postulantes', component: GestionPostulanteComponent },
       { path: 'informes', component: GestionInformesComponent },
       { path: 'usuarios-temporales', component: UsuariosTemporalesComponent },
       { path: '**', redirectTo: 'login' }
];
