import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Video } from 'src/app/entities/videos/video';
import { environment } from 'src/environments/environment'
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class VideosService {
  url: string = `${environment.backendApi}/videos`

  constructor(private http: HttpClient, private auth: AuthService) { }

  getVideos(queryPaylaod = {}): Observable<any> {
    const options = queryPaylaod ? { params: new HttpParams().set('query', JSON.stringify(queryPaylaod)) } : {}
    return this.http.get(this.url, options)
  }

  getVideoById(id): Observable<any> {
    return this.http.get(this.url + '/' + id)
  }

  getVideosAdmin(queryPaylaod = {}): Observable<any> {
    const token = this.auth.isAdmin().subscribe(token => { return token })
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    }
    const options = queryPaylaod ? { params: new HttpParams().set('query', JSON.stringify(queryPaylaod)), headers } : { headers }
    return this.http.get(this.url + '/admin', options)
  }

  getVideoByIdAdmin(id): Observable<any> {
    const token = this.auth.isAdmin().subscribe(token => { return token })
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    }
    return this.http.get(this.url + '/' + id + + '/admin', { headers })
  }
}

