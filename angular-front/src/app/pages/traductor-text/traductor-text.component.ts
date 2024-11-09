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
  model = "Salamandra";
  funSimplify=false;
  funResume=false;
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
          .simplifyTextSalamandra(
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
          .resumeTextSalamandra(
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
    }  else if (tmp === 'Gallec') {
      this.srcLangCode = 'Galician';
    } else if (tmp === 'Euskera') {
      this.srcLangCode = 'Euskera';
    } else if (tmp === 'Aragonés') {
      this.srcLangCode = 'Aragonese';
    } else if (tmp === 'Portugués') {
      this.srcLangCode = 'Portuguese';
    } else if (tmp === 'Anglès') {
      this.srcLangCode = 'English';
    } else if (tmp === 'Francès') {
      this.srcLangCode = 'French';
    } else if (tmp === 'Alemà') {
      this.srcLangCode = 'German';
    } 

    console.log('nuevo valor seleccionado src: ', this.srcLangCode);
  }
  onModChange(){
    const tmp = this.traductorForm.get('sourceLanguage')?.value;
  }
  onTgtLanguageChange() {
    const tmp = this.traductorForm.get('targetLanguage')?.value;
    if (tmp === 'Castellà') {
      this.tgtLangCode = 'Spanish';
    } else if (tmp === 'Català') {
      this.tgtLangCode = 'Catalan';
    }  else if (tmp === 'Gallec') {
      this.tgtLangCode = 'Galician';
    } else if (tmp === 'Euskera') {
      this.tgtLangCode = 'Euskera';
    } else if (tmp === 'Aragonés') {
      this.tgtLangCode = 'Aragonese';
    } else if (tmp === 'Portugués') {
      this.tgtLangCode = 'Portuguese';
    } else if (tmp === 'Anglès') {
      this.tgtLangCode = 'English';
    } else if (tmp === 'Francès') {
      this.tgtLangCode = 'French';
    } else if (tmp === 'Alemà') {
      this.tgtLangCode = 'German';
    } 
    console.log('nuevo valor seleccionado tgt: ', this.tgtLangCode);
  }

  onFunChange() {
    this.funSimplify = false;
    this.funResume = false;
    const tmp = this.traductorForm.get('functionality')?.value;
    if (tmp === 'Simplificar') {
      this.funSimplify = true;
    } else if (tmp === 'Resumir') {
      this.funResume = true;
    }
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
