import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = "http://localhost:5000/";

  constructor(private http: HttpClient) { }

  signup({ firstname, email, password }) {
    const tempUrl = this.url + "/signup";
    return this.http.post(tempUrl, { firstname, email, password });
  }

  signin({ email, password }) {
    const tempUrl = this.url + "/signin";
    return this.http.post(tempUrl, { email, password })
  }

  logout(id) {
    return localStorage.removeItem(id);
  }
}
