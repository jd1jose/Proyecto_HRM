import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-redes',
  standalone: true,
    imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './redes.component.html',
  styleUrls: ['./redes.component.css']
})
export class RedesComponent implements OnInit {

  @Input() form!: FormGroup;
  previewUrl: string | ArrayBuffer | null = null;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    if (!this.form) {
      this.form = this.fb.group({});
    }

    const campos = [
      'usaRedesSociales',
      'dejaActividadesPorRedes',
      'horaMasActiva',
      'revisaAntesDormir',
      'tiempoEnRedes',
      'tiempoChatAmigos',
      'tiempoChatFamiliares',
      'tiempoPlaticaPareja',
      'haDejadoRedes',
      'tipoContenido',
      'capturaPerfil' 
    ];

    campos.forEach(campo => this.ensureControl(campo));
  }

  private ensureControl(nombre: string) {
    if (!this.form.get(nombre)) {
      this.form.addControl(nombre, this.fb.control(''));
    }
  }
 // 📸 Maneja la carga del archivo
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      this.form.get('capturaPerfil')?.setValue(file);

      // Muestra previsualización
      const reader = new FileReader();
      reader.onload = () => this.previewUrl = reader.result;
      reader.readAsDataURL(file);
    } else {
      alert('Solo se permiten imágenes PNG o JPG.');
    }
  }
}
