import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-salud-step',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './salud-step.component.html',
  styleUrls: ['./salud-step.component.css']
})
export class SaludStepComponent {
  @Input({ required: true }) form!: FormGroup;
}
