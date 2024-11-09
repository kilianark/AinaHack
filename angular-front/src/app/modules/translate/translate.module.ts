import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TraductorTextComponent } from '../../pages/traductor-text/traductor-text.component';
import { TraductorDocComponent } from '../../pages/traductor-doc/traductor-doc.component';
import { provideHttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateService } from '../../services/translate/translate.service';

@NgModule({
  declarations: [
    TraductorTextComponent,
    TraductorDocComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [provideHttpClient(), TranslateService]
})
export class TranslateModule {}

