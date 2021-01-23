import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlansService {

  url: string = "http://localhost:5000/api/plans";

  constructor(private http: HttpClient) { }

  getAllPlans(): any {
    return this.http.get(this.url);
  }

  getPlan(id): any {
    const tempUrl = this.url + "/" + id;
    return this.http.get(tempUrl);
  }

  postNewPlan(pObj): any {
    return this.http.post(this.url, pObj);
  }

  UpdatePlan(pObj): any {
    return this.http.put(this.url, pObj);
  }

  deletePlan(id): any {
    const tempUrl = this.url + "/" + id;
    return this.http.delete(tempUrl);
  }

}
