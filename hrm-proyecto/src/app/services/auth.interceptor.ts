import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

// Interceptor que adjunta el token y maneja 401
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  try {
    const token = sessionStorage.getItem('token');
    const authReq = token
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : req;

    return next(authReq).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          // Opcional: limpiar token o redirigir
          // sessionStorage.removeItem('token');
          console.warn('API respondió 401 (Unauthorized).');
        }
        return throwError(() => err);
      })
    );
  } catch {
    return next(req);
  }
};
