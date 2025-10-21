import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-aspectos-consumo-step',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './aspectos-consumo-step.component.html',
  styleUrls: ['./aspectos-consumo-step.component.css']
})
export class AspectosConsumoStepComponent {
  @Input({ required: true }) form!: FormGroup;
}
