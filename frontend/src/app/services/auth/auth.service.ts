import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = "http://localhost:5000/api";

  constructor(private http: HttpClient) { }

  signup( payload ): Observable<any> {
    const tempUrl = this.url + "/signup";
    return this.http.post(tempUrl, payload);
  }

  signin( email: string, password: string ): Observable<any> {
    const tempUrl = this.url + "/signin";
    return this.http.post(tempUrl, { email, password });
  }

  logout(): void {
    if ( window.localStorage && (localStorage.getItem('token') || localStorage.getItem('token')) ){
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }
}
