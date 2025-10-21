import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-referencias-personales-step',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './referencias-personales-step.component.html',
  styleUrls: ['./referencias-personales-step.component.css']
})
export class ReferenciasPersonalesStepComponent {
  @Input({ required: true }) form!: FormGroup;
}
