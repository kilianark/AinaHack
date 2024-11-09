import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '../../services/translate/translate.service';

@Component({
  selector: 'app-resumir',
  templateUrl: './resumir.component.html',
  styleUrl: './resumir.component.css'
})
export class ResumirComponent {
  traductorForm: FormGroup;
  resumedText: string | null = null;

  constructor(private fb: FormBuilder, private translateService: TranslateService){ 
    this.traductorForm = this.fb.group({
      sourceLanguage: ['es'], // Idioma de origen
      targetLanguage: ['cat'], // Idioma de destino
      text: ['', [Validators.required, Validators.maxLength(5000)]] // Campo de texto
    });
  }

  guardar() {
    if (this.traductorForm.valid) {
      console.log("pre-translateService")
      this.translateService.resumeText('Spanish', 'Catalan', this.traductorForm.get('text')?.value).subscribe(response => {
        this.resumedText = response
        console.log(response)
      });
    }
  }
}
