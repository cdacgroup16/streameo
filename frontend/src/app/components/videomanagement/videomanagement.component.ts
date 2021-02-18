import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Video } from 'src/app/entities/videos/video';
import { VideosService } from 'src/app/services/videos/videos.service';
@Component({
  selector: 'app-videomanagement',
  templateUrl: './videomanagement.component.html',
  styleUrls: ['./videomanagement.component.scss'],
})

export class VideomanagementComponent implements OnInit {
  videoList: Video[] = []

  constructor(private videoService: VideosService, private snack: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.getAllVideos()
  }

  deleteVideoById(id) {
    prompt('are you sure you want to delete this video?', 'YES');
    this.videoService.removeVideo(id).subscribe(res => {
      this.snack.open(res?.message, 'Dismiss', { duration: 3000 })
      this.getAllVideos()
    }, err => {
      this.snack.open(err?.error?.message, "Dismiss", { duration: 3000 });
      console.error('Failed to get videos from the database \n', err?.error);
    })
  }

  getAllVideos() {
    this.videoService.getVideosAdmin().subscribe(res => {
      this.videoList = res;
    }, err => {
      this.snack.open(err?.error?.message, "Dismiss", { duration: 3000 });
      console.error('Failed to get videos from the database \n', err?.error);
    })
  }

  redirectToUpdateVideo(id) {
    this.router.navigate(['/updatevideo/' + id])
  }
}