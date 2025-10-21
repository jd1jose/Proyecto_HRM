import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-datos-economicos-step',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './datos-economicos-step.component.html',
  styleUrls: ['./datos-economicos-step.component.css']
})
export class DatosEconomicosStepComponent {
  @Input({ required: true }) form!: FormGroup;
}

