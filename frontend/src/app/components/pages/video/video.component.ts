import { Component, OnInit } from '@angular/core';
import { Video } from 'src/app/entities/videos/video';
import { VideosService } from 'src/app/services/videos/videos.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  video: Video

  constructor(private videoService: VideosService) { }

  ngOnInit(): void {
    // this.videoService.getVideos().subscribe(data => {
    //   this.video = data[0]
    // }, (console.error))
    // this.videoService.getVideosAdmin().subscribe(data => {
    //   console.log(data);
    // }, (console.error))
    // this.videoService.getVideosAdmin
  }

}
