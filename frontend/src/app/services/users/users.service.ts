import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  url = "http://localhost:5000/api/users";

  constructor(private http: HttpClient) { }

  getAllUser(): any {
    return this.http.get(this.url);
  }

  getUser(id): any {
    const tempUrl = this.url + "/" + id;
    return this.http.get(tempUrl);
  }

  updateUser(id, user): any {
    const tempUrl = this.url + "/" + id;
    return this.http.put(tempUrl, user);
  }

  resetPassword(id, newPassword, oldPassword): any {
    const rstUrl = this.url + "/reset-password/" + id;
    return this.http.put(rstUrl, { newPassword, oldPassword });
  }
}
