import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-referencias-laborales-step',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './referencias-laborales-step.component.html',
  styleUrls: ['./referencias-laborales-step.component.css']
})
export class ReferenciasLaboralesStepComponent {
  @Input({ required: true }) form!: FormGroup;
}
