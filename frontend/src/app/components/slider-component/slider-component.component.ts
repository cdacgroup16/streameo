import { Component, Input, OnInit } from '@angular/core';
import { Video } from 'src/app/entities/videos/video';
import { VideosService } from 'src/app/services/videos/videos.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-slider-component',
  templateUrl: './slider-component.component.html',
  styleUrls: ['./slider-component.component.scss']
})
export class SliderComponentComponent implements OnInit {
  url: string = environment.backendApi;
  @Input() filter: any = {};
  videos: Video[] = [];
  images: any[] = [];

  constructor(private vidService: VideosService) { }

  ngOnInit(): void {
    this.getVideos();
  }

  getVideos = () => {
    this.vidService.getVideos(this.filter).subscribe(res => {
      this.videos = res;
      this.setImages();
    })
  }

  setImages() {
    this.videos.forEach(video => {
      this.images.push({ path: this.url + video?.poster?.src })
    })
  }
}
