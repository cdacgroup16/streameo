import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  url: string = environment.backendApi + '/api/categories' 

  constructor(private http: HttpClient, private auth: AuthService) { }
  token = this.auth.isSignedIn();
  header = { 'Authorization': "Bearer " + this.token };


  getAllCat(): any {
    return this.http.get(this.url);
  }


  getCat(id): any {
    const tempUrl: string = this.url + "/" + id;
    return this.http.get(tempUrl);
  }


  postNewCat(cObj): any {

    return this.http.post(this.url, cObj, { headers: this.header });
  }

  updateCat(id, name): any {
    let tempurl = this.url + '/' + id;
    return this.http.put(tempurl, name, { headers: this.header });
  }

  delCat(id): any {
    const tempUrl = this.url + "/" + id;
    return this.http.delete(tempUrl, { headers: this.header });
  }

}
