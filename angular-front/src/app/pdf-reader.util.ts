import * as pdfjsLib from 'pdfjs-dist';
import { GlobalWorkerOptions } from 'pdfjs-dist';

// Configurar el worker con pdfjs
GlobalWorkerOptions.workerSrc = '../../public/assets/pdf.worker.js';

// Función para extraer texto de un archivo PDF
export async function extractTextFromPDF(file: File): Promise<string> {
  const pdfData = await file.arrayBuffer();
  const pdfDocument = await pdfjsLib.getDocument({ data: pdfData }).promise;
  let textContent = '';

  for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
    const page = await pdfDocument.getPage(pageNum);
    const text = await page.getTextContent();
    const pageText = text.items.map((item: any) => item.str).join(' ');
    textContent += pageText + '\n';
  }

  return textContent;
}

