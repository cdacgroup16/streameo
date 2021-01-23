import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = "http://localhost:5000/signup";

  constructor(private http: HttpClient) { }

  signup(signup) {
    return this.http.post(this.url, signup);
  }
  signin(signin) {
    return this.http.post(this.url, signin)
  }
  logout(id) {
    return localStorage.removeItem(id);
  }
}
