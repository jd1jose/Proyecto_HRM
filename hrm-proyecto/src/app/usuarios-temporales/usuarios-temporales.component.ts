import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UsuariosTemporalesService, UsuarioTemporal } from '../services/usuarios-temporales.service';

@Component({
  selector: 'app-usuarios-temporales',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './usuarios-temporales.component.html',
  styleUrls: ['./usuarios-temporales.component.css']
})
export class UsuariosTemporalesComponent implements OnInit {
  form!: FormGroup;

  usuarios: UsuarioTemporal[] = [];
  roles: string[] = ['admin','reclutador','tecnico','cliente'];
  tipos: Array<'temporal' | 'fijo'> = ['temporal', 'fijo'];

  constructor(private fb: FormBuilder, private svc: UsuariosTemporalesService) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      dias: [7, [Validators.min(1)]],
      rol: ['reclutador'],
      tipo: ['temporal', [Validators.required]]
    });

    // Estado inicial del control 'dias' según el tipo
    const tipoIni = this.form.get('tipo')?.value as 'temporal' | 'fijo';
    if (tipoIni === 'fijo') {
      this.form.get('dias')?.disable({ emitEvent: false });
    }
  }

  ngOnInit(): void {
    this.reload();
  }

  get f() { return this.form.controls; }

  reload(): void {
    this.svc.fetchFromApi().subscribe((rows: UsuarioTemporal[]) => {
      this.usuarios = rows;
    });
  }

  crear(): void {
    if (this.form.invalid) return;
    const { nombre, email, password, dias, rol, tipo } = this.form.value as { nombre: string; email: string; password: string; dias?: number; rol?: string; tipo: 'temporal'|'fijo' };
    const effDias = tipo === 'temporal' ? (dias ?? 7) : 365 * 100; // 100 años para fijos

    this.svc.createInBackend({ nombre, email, password, rol: (rol || 'reclutador') as string, tipo }).subscribe({
      next: () => {
        this.svc.add({ nombre: nombre!, email: email!, dias: effDias as number, rol, tipo });
        this.form.reset({ nombre: '', email: '', password: '', dias: 7, rol: 'reclutador', tipo: 'temporal' });
        this.reload();
      },
      error: (err) => {
        console.error('No se pudo crear en backend', err);
        alert(err?.error?.message || 'No se pudo crear el usuario en el servidor');
      }
    });
  }

  eliminar(id: string): void {
    this.svc.remove(id);
    this.reload();
  }

  extender(id: string, dias: number): void {
    this.svc.extend(id, dias);
    this.reload();
  }

  purgar(): void {
    this.svc.purgeExpired();
    this.reload();
  }

  estado(u: UsuarioTemporal): 'activo' | 'expirado' {
    return u.expiraEn > Date.now() ? 'activo' : 'expirado';
  }

  fmtFecha(ms: number): string {
    const d = new Date(ms);
    return d.toLocaleString();
  }

  ngAfterViewInit(): void {
    const tipoCtrl = this.form.get('tipo');
    const diasCtrl = this.form.get('dias');
    tipoCtrl?.valueChanges.subscribe((t: 'temporal' | 'fijo') => {
      if (t === 'fijo') {
        diasCtrl?.disable({ emitEvent: false });
      } else {
        diasCtrl?.enable({ emitEvent: false });
      }
    });
  }
}




