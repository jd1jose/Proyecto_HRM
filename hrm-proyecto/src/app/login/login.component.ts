import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any;
  loading = false;
  errorMessage = '';
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }


  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.errorMessage = '';

    this.api.login(this.form.value).subscribe({
      next: (res) => {
        // { token, user: { id, nombre, email } }
        sessionStorage.setItem('token', res.token);
        // redirige a tu ruta de bandeja principal definida en app.routes.ts
        this.router.navigate(['/bandeja/principal']);
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Credenciales inválidas';
        this.loading = false;
      },
      complete: () => (this.loading = false),
    });
  }
}
