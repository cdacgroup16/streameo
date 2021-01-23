import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = "http://localhost:5000/";

  constructor(private http: HttpClient) { }

  signup(signup) {
    const tempUrl = this.url + "/signup";
    return this.http.post(tempUrl, signup);
  }
  signin(signin) {
    const tempUrl = this.url + "/signin";
    return this.http.post(tempUrl, signin)
  }
  logout(id) {
    return localStorage.removeItem(id);
  }
}
