
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  constructor(private service: UsersService, private auth: AuthService, private snack: MatSnackBar, private router: Router) { }

  firstname: string;
  lastname: string;
  email: string;
  password: string;



  ActiveUser = JSON.parse(localStorage.getItem('user'));

  ngOnInit(): void {
    if (!(this.auth.isSignedIn())) {
      this.snack.open('You\'re not an admin', "Dismiss", { duration: 3000 });
      this.router.navigate(['/home'])
      return
    }

    this.firstname = this.ActiveUser.firstname;
    this.lastname = this.ActiveUser.lastname;
    this.email = this.ActiveUser.email;
  }

  onSaveDetails() {
    // console.log(this.firstname);
    // console.log(this.lastname);
    // console.log(this.ActiveUser._id);

    if (this.auth.isSignedIn()) {
      let myuser = { firstname: this.firstname, lastname: this.lastname, password: this.password }
      this.service.updateUser(this.ActiveUser._id, myuser).subscribe((res) => {
        this.snack.open("Updated Successfully", "Dismiss", { duration: 1000 });
        console.log("Updated");
      }), (err) => {
        this.snack.open(" error" + err.error?.message, "Dismiss", { duration: 1000 });
        console.log("error" + err);
      };
    } else {
      this.snack.open("not signed in", "Dismiss");
    }

  }

  oldPassword: string;
  newPassword: any;

  onUpdatePassword() {
    if (this.auth.isSignedIn()) {
      console.log(this.oldPassword);
      console.log(this.newPassword);
      this.service.resetPassword(this.ActiveUser._id, this.newPassword, this.oldPassword).subscribe((res) => {
        this.snack.open("Password Update Success ", "Dismiss", { duration: 1000 });
        console.log("Password Updated Success");
      }, (err) => {
        this.snack.open("UpdateFailed" + err.error?.message, "Dismiss", { duration: 1000 });
        console.error(err);
      }
      )
    }
    else {
      this.snack.open("Not A user", "Dismiss");
    }
  }

}
