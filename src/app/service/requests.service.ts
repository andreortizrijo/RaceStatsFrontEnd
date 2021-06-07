import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private http: HttpClient) { }

  httpGET(api: string, header: any): Observable<HttpResponse<any>>{
    return this.http.get(api, {
        headers: new HttpHeaders({ 'token': header }),
        observe: 'response',
      }
    );
  };

  httpPOST(api: string, body: any): Observable<HttpResponse<any>>{
    return this.http.post(api, body, {
      observe: 'response',
    })
  }
}
