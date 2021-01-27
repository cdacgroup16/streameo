import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PlansService {

  url: string = environment.backendApi + '/api/plans';
  token: any;
  header: any;

  constructor(private http: HttpClient, private auth: AuthService,) {

    this.token = this.auth.isSignedIn();
    this.header = { 'Authorization': "Bearer " + this.token };
  }

  getAllPlans(): any {
    return this.http.get(this.url);
  }

  getPlan(id): any {
    const tempUrl = this.url + "/" + id;
    return this.http.get(tempUrl);
  }

  postNewPlan(pObj): any {
    return this.http.post(this.url, pObj, { headers: this.header });
  }

  updatePlan(id, pObj): any {
    const tempUrl = this.url + "/" + id;
    return this.http.put(tempUrl, pObj, { headers: this.header });
  }

  deletePlan(id): any {
    const tempUrl = this.url + "/" + id;
    return this.http.delete(tempUrl, { headers: this.header });
  }

}
