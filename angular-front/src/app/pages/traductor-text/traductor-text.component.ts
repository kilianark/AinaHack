import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { extractTextFromPDF } from '../../pdf-reader.util';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateService } from '../../services/translate/translate.service';

@Component({
  selector: 'app-traductor-text',
  templateUrl: './traductor-text.component.html',
  styleUrl: './traductor-text.component.css'
})
export class TraductorTextComponent {
  traductorForm: FormGroup;
  translatedText: string | null = null;

  constructor(private fb: FormBuilder, private translateService: TranslateService) {
    this.traductorForm = this.fb.group({
      sourceLanguage: ['es'], // Idioma de origen
      targetLanguage: ['cat'], // Idioma de destino
      text: ['', [Validators.required, Validators.maxLength(500)]] // Campo de texto
    });
  }

  guardar() {
    if (this.traductorForm.valid) {
      console.log("pre-translateService")
      this.translateService.simplifyText('Spanish', 'Catalan', this.traductorForm.get('text')?.value).subscribe(response => {
        this.translatedText = response
        console.log(response)
      });
    }
  }

}
