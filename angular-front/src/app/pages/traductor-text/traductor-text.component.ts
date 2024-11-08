import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-traductor-text',
  templateUrl: './traductor-text.component.html',
  styleUrl: './traductor-text.component.css'
})
export class TraductorTextComponent {
  traductorForm: FormGroup;
  translatedText: string | null = null;

  constructor(private fb: FormBuilder) {
    this.traductorForm = this.fb.group({
      sourceLanguage: ['es'], // Idioma de origen
      targetLanguage: ['cat'], // Idioma de destino
      text: ['', [Validators.required, Validators.maxLength(500)]] // Campo de texto
    });
  }

  guardar() {
    if (this.traductorForm.valid) {
      const textToTranslate = this.traductorForm.get('text')?.value;
      // Lógica de traducción. Para este ejemplo, mostramos el mismo texto.
      this.translatedText = textToTranslate;
    }
  }

}
