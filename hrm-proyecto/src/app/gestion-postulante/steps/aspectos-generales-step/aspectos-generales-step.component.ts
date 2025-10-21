import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-aspectos-generales-step',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './aspectos-generales-step.component.html',
  styleUrls: ['./aspectos-generales-step.component.css']
})
export class AspectosGeneralesStepComponent {
  @Input({ required: true }) form!: FormGroup;
}
