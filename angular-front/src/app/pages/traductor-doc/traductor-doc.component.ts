import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { extractTextFromPDF } from '../../pdf-reader.util';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-traductor-doc',
  standalone: true,
  imports: [CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule ],
  templateUrl: './traductor-doc.component.html',
  styleUrl: './traductor-doc.component.css'
})
export class TraductorDocComponent {
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

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      extractTextFromPDF(file).then(text => {
        console.log(text); // Aquí puedes mostrar el texto extraído
      });
    }
  }
}
