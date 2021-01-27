import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Categories } from 'src/app/entities/categories/categories';
import { CategoriesService } from 'src/app/services/categories/categories.service';

@Component({
  selector: 'app-categorylist',
  templateUrl: './categorylist.component.html',
  styleUrls: ['./categorylist.component.scss']
})
export class CategorylistComponent implements OnInit {


  constructor(private service: CategoriesService, private route: Router, private snack: MatSnackBar) { }
  categoryList: any;
  id: Categories;
  ngOnInit(): void {
    this.service.getAllCat().subscribe((res) => {
      this.categoryList = res;
    })
  }
  onEdit(id) {
    let url = "/editcategory/" + id;
    this.route.navigate([url]);
  }
  onDelete(id) {
    this.service.delCat(id).subscribe((res) => {
      this.snack.open("Delete Success", "Dismiss", { duration: 1000 });
      // console.log(res);
    }, (err) => {
      this.snack.open("Delete Failed" + err.error?.message, "Dismiss", { duration: 1000 });
      console.log(err);
    })
    window.location.reload();
  }

}
