import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  url = environment.backendApi + '/api/users';

  constructor(private http: HttpClient, private auth: AuthService) { }

  getAllUser(): any {
    return this.http.get(this.url);
  }

  getUser(id): any {
    const token = this.auth.isSignedIn();
    const headers = { 'Authorization': "Bearer " + token };
    const tempUrl = this.url + "/" + id;
    return this.http.get(tempUrl, { headers });
  }

  updateUser(id, user): any {
    const token = this.auth.isSignedIn();
    const headers = { 'Authorization': "Bearer " + token };
    const tempUrl = this.url + "/" + id;
    return this.http.put(tempUrl, user, { headers });
  }

  resetPassword(id, newPassword, oldPassword): any {
    const token = this.auth.isSignedIn();
    const headers = { 'Authorization': "Bearer " + token };
    const rstUrl = this.url + "/reset-password/" + id;
    return this.http.put(rstUrl, { newPassword, oldPassword }, { headers });
  }
}
