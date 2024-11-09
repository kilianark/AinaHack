import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateService } from '../../services/translate/translate.service';
import { extractTextFromPDF } from '../../pdf-reader.util';

@Component({
  selector: 'app-traductor-doc',
  templateUrl: './traductor-doc.component.html',
  styleUrl: './traductor-doc.component.css'
})
export class TraductorDocComponent {
  traductorForm: FormGroup;
  translatedText: string | null = null;

  constructor(private fb: FormBuilder, private translateService: TranslateService){ 
    this.traductorForm = this.fb.group({
      sourceLanguage: ['es'], // Idioma de origen
      targetLanguage: ['cat'], // Idioma de destino
      text: ['', [Validators.required, Validators.maxLength(500)]] // Campo de texto
    });
  }

  guardar() {
    if (this.traductorForm.valid) {
      this.translateService.translateText('Spanish', 'Catalan', this.traductorForm.get('text')?.value).subscribe(response => {
        this.translatedText = response.translatedText
      });
    }
  }
  /*onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      extractTextFromPDF(file).then(text => {
        console.log(text); // Aquí puedes mostrar el texto extraído
      });
    }
  }*/
}
