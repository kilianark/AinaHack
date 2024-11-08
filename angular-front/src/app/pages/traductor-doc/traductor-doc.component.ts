import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-traductor-doc',
  standalone: true,
  imports: [CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule],
  templateUrl: './traductor-doc.component.html',
  styleUrl: './traductor-doc.component.css'
})
export class TraductorDocComponent {
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
