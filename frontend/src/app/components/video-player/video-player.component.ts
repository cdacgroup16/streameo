import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/entities/users/user';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth/auth.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {
  url: string = environment.backendApi;
  videoId: string = '';
  quality: string = 'low';
  user: User = JSON.parse(localStorage.getItem('user'))
  token: string = this.auth.isSignedIn()
  videoStream: string;

  constructor(private auth: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(data => {
      this.videoId = data.videoId
    }, err => console.error(err))
    this.videoStream = `${this.url}/api/videos/stream/${this.quality}/${this.videoId}/${this.token}`;
  }

  get getVideoStream(): string {
    return this.videoStream;
  }
  set setVideoStream(quality: string) {
    this.videoStream = `${this.url}/api/videos/stream/${quality}/${this.videoId}/${this.token}`;
  }

  setQuality(quality: string) {
    this.quality = quality
    this.videoStream = `${this.url}/api/videos/stream/${quality}/${this.videoId}/${this.token}`
  }

  printval() {
    console.log(this.quality)
    console.log(this.videoStream)
  }

}
