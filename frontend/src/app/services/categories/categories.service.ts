import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  url: string = "http://localhost:5000/api/categories"

  constructor(private http: HttpClient) { }

  getAllCat(): any {
    return this.http.get(this.url);
  }


  getCat(id): any {
    const tempUrl: string = this.url + "/" + id;
    return this.http.get(tempUrl);
  }


  postNewCat(cObj): any {
    return this.http.post(this.url, cObj);
  }

  updateCat(cObj): any {
    return this.http.put(this.url, cObj);
  }

  delCat(id): any {
    const tempUrl = this.url + "/" + id;
    return this.http.delete(tempUrl);
  }

}
