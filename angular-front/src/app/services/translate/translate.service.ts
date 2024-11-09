import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  private translateApiUrl = 'http://127.0.0.1:5000/translate';
  private simplifyApiUrl = 'http://127.0.0.1:5000/simplify';

  constructor(private http: HttpClient) { }

  translateText(srcLangCode: string, tgtLangCode: string, sentence: string): Observable<any> {
    const body = {
      src_lang_code: srcLangCode,
      tgt_lang_code: tgtLangCode,
      sentence: sentence
    };
    return this.http.post<any>(this.translateApiUrl, body);
  }

  simplifyText(srcLangCode: string, tgtLangCode: string, sentence: string): Observable<any> {
    const body = {
      src_lang_code: srcLangCode,
      tgt_lang_code: tgtLangCode,
      sentence: sentence
    };
    return this.http.post<any>(this.simplifyApiUrl, body);
  }

}
