import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { Categories } from 'src/app/entities/categories/categories';
@Component({
  selector: 'app-addcategories',
  templateUrl: './addcategories.component.html',
  styleUrls: ['./addcategories.component.scss']
})
export class AddcategoriesComponent implements OnInit {

  name: String;
  addcategory : Categories;
  constructor(private  auth:AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  onSubmit(){
    console.log(this.addcategory);
  }
}
