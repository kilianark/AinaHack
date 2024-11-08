import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-traductor-text',
  standalone: true,
  imports: [CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule  ],
  templateUrl: './traductor-text.component.html',
  styleUrl: './traductor-text.component.css'
})
export class TraductorTextComponent {
  text: string = '';
}
