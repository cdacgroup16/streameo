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
    if (!this.auth.isAdmin()) {
      return
    }
    const token = this.auth.isAdmin()
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    }
    const options = queryPaylaod ? { params: new HttpParams().set('query', JSON.stringify(queryPaylaod)), headers } : { headers }
    return this.http.get(this.url + '/admin', options)
  }

  getVideoByIdAdmin(id): Observable<any> {
    if (!this.auth.isAdmin()) {
      return
    }
    const token = this.auth.isAdmin()
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    }
    return this.http.get(this.url + '/' + id + + '/admin', { headers })
  }

  getVideoStream(videoId, quality): Observable<any> {
    if (this.auth.isSignedIn()) {
      return
    }
    const token = this.auth.isSignedIn();
    const headers = {
      'Content-Type': 'application/json',
      'Accept': '*/*',
      'Authorization': `Bearer ${token}`
    }
    return this.http.get(this.url + `/stream/${quality}/${videoId}`)
  }

  // createVideo(formData): Observable<any> {
  //   if (!this.auth.isAdmin()) {
  //     return
  //   }
  //   const token = this.auth.isAdmin()
  //   const headers = {
  //     'Content-Type': 'multipart/form-data',
  //     'Accept': 'application/json',
  //     'Authorization': `Bearer ${token}`
  //   }
  //   return this.http.post(this.url, formData, { headers })
  // }

  // updateVideo(videoId, formData): Observable<any> {
  //   if (!this.auth.isAdmin()) {
  //     return
  //   }
  //   const token = this.auth.isAdmin()
  //   const headers = {
  //     'Content-Type': 'multipart/form-data',
  //     'Accept': 'application/json',
  //     'Authorization': `Bearer ${token}`
  //   }
  //   return this.http.put(this.url + videoId, formData, { headers })
  // }

  removeVideo(videoId): Observable<any> {
    if (!this.auth.isAdmin()) {
      return
    }
    const token = this.auth.isAdmin()
    const headers = {
      'Content-Type': 'multipart/form-data',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    }
    return this.http.delete(this.url + videoId)
  }
}

