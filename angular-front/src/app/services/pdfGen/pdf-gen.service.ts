import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class PdfGenService {

  constructor() { }

  generatePDF(text: string) {
    const doc = new jsPDF();

    doc.setFontSize(28);
    doc.text('Trad Cat', 20, 25);

    //linea divisoria
    doc.setLineWidth(0.5);
    doc.line(10, 45, 200, 45);

    doc.setFontSize(12);
    doc.text(text, 10, 60, { maxWidth: 190 });

    doc.output('dataurlnewwindow');
  }
}
