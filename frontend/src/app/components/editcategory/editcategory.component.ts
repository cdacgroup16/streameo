import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Categories } from 'src/app/entities/categories/categories';
import { CategoriesService } from 'src/app/services/categories/categories.service';

@Component({
  selector: 'app-editcategory',
  templateUrl: './editcategory.component.html',
  styleUrls: ['./editcategory.component.scss']
})
export class EditcategoryComponent implements OnInit {

  category: Categories;
  id: string;
  name: string;

  constructor(private auth: AuthService, private router: Router, private ActiveRoute: ActivatedRoute, private serv: CategoriesService) { }

  ngOnInit(): void {
  }
  onSubmit() {
    this.ActiveRoute.params.subscribe((res) => {
      this.id = res.id;
      this.serv.updateCat(this.id, { name: this.name }).subscribe((res) => {
        console.log(res);
      }, (err) => {
        console.log(err);

      });
      console.log(this.name);
      console.log(this.id);
    })

  }
}







