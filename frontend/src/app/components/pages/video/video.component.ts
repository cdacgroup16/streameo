import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Video } from 'src/app/entities/videos/video';
import { VideosService } from 'src/app/services/videos/videos.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  videoId: string
  video: Video

  constructor(private videoService: VideosService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(data => {
      this.videoId = data.videoId
    }, err => console.error(err))
    this.videoService.getVideoById(this.videoId).subscribe(data => {
      this.video = data
    }, err => console.error(err))
  }

}
