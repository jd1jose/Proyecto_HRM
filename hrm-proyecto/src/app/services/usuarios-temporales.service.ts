import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface UsuarioTemporal {
  id: string;
  nombre: string;
  email: string;
  creadoEn: number;     // epoch ms
  expiraEn: number;     // epoch ms
  rol?: string;
  tipo?: 'temporal' | 'fijo';
}

@Injectable({ providedIn: 'root' })
export class UsuariosTemporalesService {
  private storageKey = 'tempUsers';
  constructor(private api: ApiService) {}

  private read(): UsuarioTemporal[] {
    try {
      const raw = localStorage.getItem(this.storageKey);
      return raw ? (JSON.parse(raw) as UsuarioTemporal[]) : [];
    } catch {
      return [];
    }
  }

  private write(users: UsuarioTemporal[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }

  list(): UsuarioTemporal[] {
    return this.read().sort((a, b) => b.creadoEn - a.creadoEn);
  }

  // Carga usuarios desde la API y los adapta a UsuarioTemporal.
  fetchFromApi(): Observable<UsuarioTemporal[]> {
    return this.api.getUsers().pipe(
      map((resp: any) => {
        const now = Date.now();
        const items: any[] = Array.isArray(resp)
          ? resp
          : Array.isArray(resp?.data?.items)
            ? resp.data.items
            : Array.isArray(resp?.data)
              ? resp.data
              : Array.isArray(resp?.items)
                ? resp.items
                : [];
        return (items || []).map((r: any) => {
          const id = r?.id || r?._id || r?.uuid || String(Math.random());
          const nombre = r?.nombre || r?.name || r?.fullName || r?.full_name || r?.usuario || r?.email || 'Usuario';
          const email = (r?.email || '').toString().toLowerCase();
          const creadoEn = new Date(r?.creadoEn || r?.createdAt || r?.created_at || r?.fecha_creacion || now).getTime();
          const expirRaw = r?.expiraEn || r?.expiresAt || r?.fecha_expiracion || null;
          const expiraEn = expirRaw ? new Date(expirRaw).getTime() : now + 365 * 24 * 60 * 60 * 1000; // 1 año por defecto
          const rol = r?.rol || r?.role || (r?.temporal ? 'temporal' : 'usuario');
          const tipo: 'temporal' | 'fijo' | undefined = r?.tipo || r?.user_type || (r?.temporal ? 'temporal' : undefined);
          return { id, nombre, email, creadoEn, expiraEn, rol, tipo } as UsuarioTemporal;
        }).sort((a, b) => b.creadoEn - a.creadoEn);
      }),
      catchError(() => of(this.list()))
    );
  }

  add(data: { nombre: string; email: string; dias?: number; rol?: string; tipo?: 'temporal' | 'fijo' }): UsuarioTemporal {
    const now = Date.now();
    const dias = data.dias && data.dias > 0 ? data.dias : 7;
    const user: UsuarioTemporal = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2),
      nombre: data.nombre.trim(),
      email: data.email.trim().toLowerCase(),
      creadoEn: now,
      expiraEn: now + dias * 24 * 60 * 60 * 1000,
      rol: data.rol?.trim() || 'usuario',
      tipo: data.tipo || 'temporal',
    };
    const users = this.read();
    users.unshift(user);
    this.write(users);
    return user;
  }

  remove(id: string): void {
    const users = this.read().filter(u => u.id !== id);
    this.write(users);
  }

  extend(id: string, dias: number): void {
    const users = this.read();
    const idx = users.findIndex(u => u.id === id);
    if (idx >= 0) {
      const ms = Math.max(users[idx].expiraEn, Date.now());
      users[idx] = { ...users[idx], expiraEn: ms + Math.max(1, dias) * 24 * 60 * 60 * 1000 };
      this.write(users);
    }
  }

  purgeExpired(): void {
    const now = Date.now();
    const users = this.read().filter(u => u.expiraEn > now);
    this.write(users);
  }

  // Crea el usuario en el backend
  createInBackend(data: { nombre: string; email: string; password: string; rol: string; tipo: 'temporal'|'fijo' }): Observable<any> {
    const payload = {
      full_name: data.nombre,
      email: data.email,
      password: data.password,
      role: data.rol,
      user_type: data.tipo,
    };
    return this.api.createUser(payload);
  }
}
