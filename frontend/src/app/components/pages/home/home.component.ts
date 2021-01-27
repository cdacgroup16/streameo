import { Component, OnInit } from '@angular/core';
import { Categories } from 'src/app/entities/categories/categories';
import { Video } from 'src/app/entities/videos/video';
import { VideosService } from 'src/app/services/videos/videos.service';
import { CategoriesService } from '../../../services/categories/categories.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  catList: Categories[];
  vidList: Video[];


  constructor(private cat: CategoriesService, private vidService: VideosService) { }


  ngOnInit(): void {
    this.getAllCategories()
    this.getAllVideos()
  }

  getAllCategories() {
    this.cat.getAllCat().subscribe((res) => {
      this.catList = res;
    })
  }
  getAllVideos() {
    this.vidService.getVideos().subscribe((res) => {
      this.vidList = res;
    })
  }
}
