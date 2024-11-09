import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateService } from '../../services/translate/translate.service';
import { extractTextFromPDF } from '../../pdf-reader.util';
import { PdfService } from '../../services/pdf/pdf.service';

@Component({
  selector: 'app-traductor-doc',
  templateUrl: './traductor-doc.component.html',
  styleUrl: './traductor-doc.component.css'
})
export class TraductorDocComponent {
  traductorForm: FormGroup;
  translatedText: string | null = null;
  selectedFile: File | null = null;
  setencePdf: string = "";
  srcLangCode = 'Spanish';
  tgtLangCode = 'Catalan';

  constructor(private fb: FormBuilder, private translateService: TranslateService, private pdfService: PdfService){ 
    this.traductorForm = this.fb.group({
      sourceLanguage: ['es'], // Idioma de origen
      targetLanguage: ['cat'], // Idioma de destino
      text: ['', [Validators.required, Validators.maxLength(500)]] // Campo de texto
    });
  }

  guardar() {
    if (!this.selectedFile) {
      console.error("No file selected!");  // Muestra un error si no hay archivo
      return;
    }
    this.pdfService.uploadPdf(this.selectedFile).subscribe(response => {
      this.setencePdf =response.text;
      console.log('Text extret: ', response.text);
      this.translateService
          .translateText(
            this.srcLangCode,
            this.tgtLangCode,
            this.setencePdf
          )
          .subscribe((response) => {
            this.translatedText = response;
            console.log(response);
          });

    });
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];  // Guarda el archivo en selectedFile
    }
  }
}
