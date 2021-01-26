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

<<<<<<< HEAD
  signup(payload): Observable<any> {
=======
  signup( payload: any): Observable<any> {
>>>>>>> 020754825b5991fa81a5c7bdfd7e99e38e81eb66
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

  isSignedIn(): any {
    if (window.localStorage && localStorage.getItem('token')) {
      return JSON.parse(localStorage.getItem('token'));
    }
    return false;
  }

  isAdmin(): any {
    if (window.localStorage && localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user'))
      return user.role === 1 ? JSON.parse(localStorage.getItem('token')) : false;
    }
    return false
  }
}
