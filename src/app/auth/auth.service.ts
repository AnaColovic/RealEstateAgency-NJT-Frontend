import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from '../config';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private loggedUser: string;

  constructor(private http: HttpClient, private router: Router, private service: ApiService) { }

  login(username: string, password: string){
    const contentHeader = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    return this.service.login(username, password, contentHeader);

  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  doLoginUser(loggedUser: string, token: string) {
    this.loggedUser = loggedUser;
    this.storeToken(token);
  }

  storeToken(token: string) {
    localStorage.setItem(this.JWT_TOKEN, token);
  }

  getJwtToken(): string {
    return localStorage.getItem(this.JWT_TOKEN);
  }

}
