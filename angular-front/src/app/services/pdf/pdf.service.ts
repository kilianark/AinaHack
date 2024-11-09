import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  // URL de la API para extraer texto del PDF
  private apiUrl = 'http://127.0.0.1:5000/extract-text-from-pdf';

  constructor(private http: HttpClient) {}

  // Método para enviar el archivo PDF a la API
  uploadPdf(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);  // Agrega el archivo al FormData con el nombre 'file'

    // Realiza una solicitud POST enviando el archivo en FormData
    return this.http.post<any>(this.apiUrl, formData);
  }
}
