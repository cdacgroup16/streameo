import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { Categories } from 'src/app/entities/categories/categories';

@Component({
  selector: 'app-editcategory',
  templateUrl: './editcategory.component.html',
  styleUrls: ['./editcategory.component.scss']
})
export class EditcategoryComponent implements OnInit {

  name: String;
  editcategory : Categories;

  constructor(private  auth:AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  onSubmit(){
    console.log(this.editcategory);
  }
}







