import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateService } from '../../services/translate/translate.service';
import { language } from '../../enums/language.enum';

@Component({
  selector: 'app-traductor-text',
  templateUrl: './traductor-text.component.html',
  styleUrl: './traductor-text.component.css'
})
export class TraductorTextComponent {
  traductorForm: FormGroup;
  translatedText: string | null = null;
  languages = Object.values(language);
  srcLangCode = 'Spanish';
  tgtLangCode = 'Catalan';

  constructor(private fb: FormBuilder, private translateService: TranslateService) {
    this.traductorForm = this.fb.group({
      sourceLanguage: [language.Spanish], // Idioma de origen
      targetLanguage: [language.Catalan], // Idioma de destino
      text: ['', [Validators.required, Validators.maxLength(5000)]] // Campo de texto
    });
  }

  guardar() {
    if (this.traductorForm.valid) {
      console.log("srcLang", this.srcLangCode);
      console.log("tgtLang", this.tgtLangCode);
      this.translateService.translateText(this.srcLangCode, this.tgtLangCode, this.traductorForm.get('text')?.value).subscribe(response => {
        this.translatedText = response
        console.log(response)
      });
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

}
