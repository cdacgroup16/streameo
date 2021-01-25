import { Component, OnInit } from '@angular/core';
import {CategoriesService} from 'src/app/services/categories/categories.service';
@Component({
  selector: 'app-videoupload',
  templateUrl: './videoupload.component.html',
  styleUrls: ['./videoupload.component.scss']
})
export class VideouploadComponent implements OnInit {

  constructor(private service: CategoriesService) { }
  categoryList: any;
  ngOnInit(): void {
    this.service.getAllCat().subscribe((res) => {
      this.categoryList = res;
    })
  }
  isOpen = false;
}
