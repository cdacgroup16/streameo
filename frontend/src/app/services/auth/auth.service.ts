import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url: string = environment.backendApi;

  constructor(private http: HttpClient) { }

  signup(payload): Observable<any> {
    const tempUrl = this.url + "/signup";
    return this.http.post(tempUrl, payload);
  }

  signin(email: string, password: string): Observable<any> {
    const tempUrl = this.url + "/signin";
    return this.http.post(tempUrl, { email, password });
  }

  logout(): void {
    if (window.localStorage && localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }
    if (window.localStorage && localStorage.getItem('user')) {
      localStorage.removeItem('user');
    }
    return
  }

  isSignedIn(): Boolean {
    if (window.localStorage && localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  isAdmin(): Boolean {
    if (window.localStorage && localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user'))
      return user.role === 1 ? true : false;
    }
    return false
  }
}
