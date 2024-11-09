import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateService } from '../../services/translate/translate.service';
import { language } from '../../enums/language.enum';
import { functions } from '../../enums/functions.enum';
import { PdfGenService } from '../../services/pdfGen/pdf-gen.service';

@Component({
  selector: 'app-traductor-text',
  templateUrl: './traductor-text.component.html',
  styleUrl: './traductor-text.component.css',
})
export class TraductorTextComponent {
  traductorForm: FormGroup;
  translatedText!: string;
  languages = Object.values(language);
  functionsArr = Object.values(functions);
  srcLangCode = 'Spanish';
  tgtLangCode = 'Catalan';
  fun = 'Traduir';

  haveContentForPDF = false;

  constructor(
    private fb: FormBuilder,
    private translateService: TranslateService,
    private pdfGenService: PdfGenService
  ) {
    this.traductorForm = this.fb.group({
      sourceLanguage: [language.Spanish], // Idioma de origen
      targetLanguage: [language.Catalan], // Idioma de destino
      functionality: [functions.Translate],
      text: ['', [Validators.required, Validators.maxLength(5000)]], // Campo de texto
    });
  }

  guardar() {
    if (this.traductorForm.valid) {
      this.translatedText = "Traduciendo...";
      console.log('srcLang', this.srcLangCode);
      console.log('tgtLang', this.tgtLangCode);
      console.log(this.fun);
      if (this.fun === 'Traduir') {
        console.log('traduint...');
        console.log('to', this.tgtLangCode);
        this.translateService
          .translateText(
            this.srcLangCode,
            this.tgtLangCode,
            this.traductorForm.get('text')?.value
          )
          .subscribe((response) => {
            this.translatedText = response;
            console.log(response);
          });

          console.log('translated to', this.tgtLangCode);

      } else if (this.fun === 'Simplificar') {
        this.translateService
          .simplifyText(
            this.srcLangCode,
            this.tgtLangCode,
            this.traductorForm.get('text')?.value
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
            this.traductorForm.get('text')?.value
          )
          .subscribe((response) => {
            this.translatedText = response;
            console.log(response);
          });
      }
      this.haveContentForPDF = true; 
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
