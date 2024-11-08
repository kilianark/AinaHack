import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateService } from '../../services/translate/translate.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';

@Component({
  selector: 'app-traductor-doc',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [provideHttpClient()],
  templateUrl: './traductor-doc.component.html',
  styleUrl: './traductor-doc.component.css'
})
export class TraductorDocComponent {
  traductorForm: FormGroup;
  translatedText: string | null = null;

  constructor(private fb: FormBuilder, private translateService: TranslateService){
    this.traductorForm = this.fb.group({
      text:['', [Validators.required]]
    });
  }

  guardar(): void {
    if (this.traductorForm.valid) {
      this.translateService.translateText('Spanish', 'Catalan', this.traductorForm.get('text')?.value).subscribe(response => {
        this.translatedText = response.translatedText
      });
    }
  }
}
