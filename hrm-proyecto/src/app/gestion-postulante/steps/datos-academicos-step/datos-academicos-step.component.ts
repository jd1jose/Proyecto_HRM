import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-datos-academicos-step',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './datos-academicos-step.component.html',
  styleUrls: ['./datos-academicos-step.component.css']
})
export class DatosAcademicosStepComponent {
  @Input({ required: true }) form!: FormGroup;
}
