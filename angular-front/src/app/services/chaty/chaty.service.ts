import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatyService {
  private apiUrl = 'http://127.0.0.1:5000/chatbot';

  constructor(private http: HttpClient) { }

  sendMessage(message: string): Observable<any> {
    const body = {message: message};

    return this.http.post<any>(this.apiUrl, body);
  }
}
