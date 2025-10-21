import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-datos-familiares-step',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './datos-familiares-step.component.html',
  styleUrls: ['./datos-familiares-step.component.css']
})
export class DatosFamiliaresStepComponent {
  @Input({ required: true }) form!: FormGroup;
}
