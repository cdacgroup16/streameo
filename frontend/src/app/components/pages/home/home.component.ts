import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../../services/categories/categories.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private cat: CategoriesService) { }

  catList: any;

  ngOnInit(): void {
    this.cat.getAllCat().subscribe((res) => {
      this.catList = res;
    })
  }

}
