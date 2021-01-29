import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { Categories } from 'src/app/entities/categories/categories';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-addcategories',
  templateUrl: './addcategories.component.html',
  styleUrls: ['./addcategories.component.scss']
})
export class AddcategoriesComponent implements OnInit {

  name: string;
  constructor(private auth: AuthService, private router: Router, private service: CategoriesService, private snack: MatSnackBar) { }

  ngOnInit(): void {
    if (!(this.auth.isSignedIn() && this.auth.isAdmin())) {
      this.snack.open('You\'re not an admin', "Dismiss", { duration: 3000 });
      this.router.navigate(['/home'])
      return
    }
  }

  onSubmit() {
    // console.log(this.name);
    if (this.auth.isSignedIn) {
      this.service.postNewCat({ name: this.name }).subscribe((res) => {
        this.name = res;
        this.snack.open("Category Added", "Dismiss", { duration: 1000 });
        console.log(this.name);
        this.router.navigate(['/categorylist']);
      }, (err) => {
        this.snack.open("Adding Failed" + err.error?.message, "Dismiss", { duration: 1000 });
        console.log(err);
      });
    }
    else {
      "not Signed in.";
    }

  }


}
