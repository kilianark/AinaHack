import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-traductor-text',
  standalone: true,
  imports: [CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule],
  templateUrl: './traductor-text.component.html',
  styleUrl: './traductor-text.component.css'
})
export class TraductorTextComponent {
  traductorForm: FormGroup;
  submittedText: string | null = null;

  constructor(private fb: FormBuilder){
    this.traductorForm = this.fb.group({
      text:['', [Validators.required]]
    });
  }

  guardar(): void {
    if (this.traductorForm.valid) {
      this.submittedText = this.traductorForm.get('text')?.value;
    }
  }

}
