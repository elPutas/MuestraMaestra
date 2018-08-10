import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as ENV } from '../../environment/environment';

@Injectable()
export class SendDataService {
  constructor(private http: HttpClient) {
  }

  public send(data: any, numberEncuesta: number): any {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    let body = {
      json: data,
      encuesta: numberEncuesta
    };

    return this.http.post(`${ENV.server_url}${ENV.sendJson}`, body, {headers: headers});
  };
  public cities(): any {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${ENV.server_url}${ENV.valueCiudades}`, {}, {headers: headers});
  };
}
