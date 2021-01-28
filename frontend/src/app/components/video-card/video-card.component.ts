import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Video } from 'src/app/entities/videos/video';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.scss']
})
export class VideoCardComponent implements OnInit {
  url: string = environment.backendApi;
  frontendUrl: string = environment.frontendUrl;
  @Input() video: Video;

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
  }

  redirectToVideoPage(id): void {
    this.router.navigateByUrl(`/video?videoId=${id}`)
  }

}
