import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { Categories } from 'src/app/entities/categories/categories';
import { CategoriesService } from 'src/app/services/categories/categories.service';

@Component({
  selector: 'app-addcategories',
  templateUrl: './addcategories.component.html',
  styleUrls: ['./addcategories.component.scss']
})
export class AddcategoriesComponent implements OnInit {

  name: string;
  constructor(private auth: AuthService, private router: Router, private service: CategoriesService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.name);
    if (this.auth.isSignedIn) {
      this.service.postNewCat({ name: this.name }).subscribe((res) => {
        this.name = res;
        console.log(this.name);
      }, (err) => {
        console.log(err);
      });
    }
    else {
      "not Signed in.";
    }
  }


}
