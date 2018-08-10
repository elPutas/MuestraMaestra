import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { StorageService } from './storage.service';
import { environment as ENV } from '../../environment/environment';


@Injectable()
export class AuthService {

  public isLoggedIn: boolean = false;

  constructor(
    private http: HttpClient,
    private storage: StorageService
  ) { }

  public login(email: string, password: string): any {

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    const body = {
      email: email,
      password: password
    };

    return this.http.post(`${ENV.server_url}${ENV.login}`, body, {headers: headers});

  }

  public logOut(): void {
    this.storage.removeStorageUser();
  }

  public setLogin(value: boolean): void {
    this.isLoggedIn = value;
  }

  public authenticated() : boolean {
    return this.isLoggedIn;
  }

}
