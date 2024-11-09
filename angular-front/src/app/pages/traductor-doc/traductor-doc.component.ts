import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateService } from '../../services/translate/translate.service';
import { PdfService } from '../../services/pdf/pdf.service';
import { PdfGenService } from '../../services/pdfGen/pdf-gen.service';
import { language } from '../../enums/language.enum';
import { functions } from '../../enums/functions.enum';


@Component({
  selector: 'app-traductor-doc',
  templateUrl: './traductor-doc.component.html',
  styleUrl: './traductor-doc.component.css'
})
export class TraductorDocComponent {
  traductorForm: FormGroup;
  translatedText!: string;
  selectedFile: File | null = null;
  setencePdf: string = "";
  languages = Object.values(language);
  functionsArr = Object.values(functions);
  srcLangCode = 'Spanish';
  tgtLangCode = 'Catalan';
  fun = 'Traduir';

  havePDF = false;
  haveContentForPDF = false;

  constructor(
    private fb: FormBuilder,
    private translateService: TranslateService,
    private pdfService: PdfService,
    private pdfGenService: PdfGenService
  ) { 
    this.traductorForm = this.fb.group({
      sourceLanguage: [language.Spanish], // Idioma de origen
      targetLanguage: [language.Catalan], // Idioma de destino
      functionality: [functions.Translate],
    });
  }

  guardar() {
    if (!this.selectedFile) {
      console.error("No file selected!");  // Muestra un error si no hay archivo
      return;
    }
    this.translatedText = "Traduint...";
    this.pdfService.uploadPdf(this.selectedFile).subscribe(response => {
      this.setencePdf =response.text;
      console.log('Text extret: ', response.text);
      if (this.fun === 'Traduir') {
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
      } else if (this.fun === 'Simplificar') {
        this.translateService
            .simplifyText(
              this.srcLangCode,
              this.tgtLangCode,
              this.setencePdf
            )
            .subscribe((response) => {
              this.translatedText = response;
              console.log(response);
            });
      } else if (this.fun === 'Resumir') {
        this.translateService
            .resumeText(
              this.srcLangCode,
              this.tgtLangCode,
              this.setencePdf
            )
            .subscribe((response) => {
              this.translatedText = response;
              console.log(response);
            });
      }
      this.haveContentForPDF = true;
    });
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];  // Guarda el archivo en selectedFile
      this.havePDF = true;
    }
  }

  onSrcLanguageChange() {
    const tmp = this.traductorForm.get('sourceLanguage')?.value;
    if (tmp === 'Castellà') {
      this.srcLangCode = 'Spanish';
    } else if (tmp === 'Català') {
      this.srcLangCode = 'Catalan';
    } else if (tmp === 'Anglès') {
      this.srcLangCode = 'English';
    }
    console.log('nuevo valor seleccionado src: ', this.srcLangCode);
  }

  onTgtLanguageChange() {
    const tmp = this.traductorForm.get('targetLanguage')?.value;
    if (tmp === 'Castellà') {
      this.tgtLangCode = 'Spanish';
    } else if (tmp === 'Català') {
      this.tgtLangCode = 'Catalan';
    } else if (tmp === 'Anglès') {
      this.tgtLangCode = 'English';
    }
    console.log('nuevo valor seleccionado tgt: ', this.tgtLangCode);
  }

  onFunChange() {
    const tmp = this.traductorForm.get('functionality')?.value;
    this.fun = tmp;
    console.log(tmp);
  }

  swapLanguages() {
    const sourceValue = this.traductorForm.get('sourceLanguage')?.value;
    const targetValue = this.traductorForm.get('targetLanguage')?.value;

    // Swap the values
    this.traductorForm.patchValue({
      sourceLanguage: targetValue,
      targetLanguage: sourceValue,
    });
    const tmpTgt = this.traductorForm.get('targetLanguage')?.value;
    if (tmpTgt === 'Castellà') {
      this.tgtLangCode = 'Spanish';
    } else if (tmpTgt === 'Català') {
      this.tgtLangCode = 'Catalan';
    } else if (tmpTgt === 'Anglès') {
      this.tgtLangCode = 'English';
    }

    const tmpSrc = this.traductorForm.get('sourceLanguage')?.value;
    if (tmpSrc === 'Castellà') {
      this.srcLangCode = 'Spanish';
    } else if (tmpSrc === 'Català') {
      this.srcLangCode = 'Catalan';
    } else if (tmpSrc === 'Anglès') {
      this.tgtLangCode = 'English';
    }

    console.log('nuevo valor seleccionado src: ', this.srcLangCode);
    console.log('nuevo valor seleccionado tgt: ', this.tgtLangCode);
  }

  generatePDF() {
    this.pdfGenService.generatePDF(this.translatedText);
  }
}
