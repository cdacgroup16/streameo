import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories/categories.service';

@Component({
  selector: 'app-categorylist',
  templateUrl: './categorylist.component.html',
  styleUrls: ['./categorylist.component.scss']
})
export class CategorylistComponent implements OnInit {

  constructor(private service: CategoriesService ) { }
  categoryList : any;
  ngOnInit(): void {
    this.service.getAllCat().subscribe((res) => {
      this.categoryList = res;
  }

}
