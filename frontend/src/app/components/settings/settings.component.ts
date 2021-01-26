import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  constructor(private service: UsersService, private auth: AuthService) { }

  firstname: string;
  lastname: string;
  email: string;
  password: string;
  newPassword: any;

  ActiveUser = JSON.parse(localStorage.getItem('user'));

  ngOnInit(): void {
    this.firstname = this.ActiveUser.firstname;
    this.lastname = this.ActiveUser.lastname;
    this.email = this.ActiveUser.email;
  }

  onSaveDetails() {
    console.log(this.firstname);
    console.log(this.lastname);
    console.log(this.ActiveUser._id);

    if (this.auth.isSignedIn()) {
      let myuser = { firstname: this.firstname, lastname: this.lastname, password: this.password }
      this.service.updateUser(this.ActiveUser._id, myuser).subscribe((res) => {
        console.log("Updated");
        ("Updated");
      }), (err) => {
        console.log("error" + err);
      };
    }

  }

  onUpdatePassword() {
    console.log(this.password);
    console.log(this.newPassword);
    this.service.resetPassword(this.ActiveUser.id, this.newPassword, this.password).subscribe((res) => {
      console.log("Password Updated Success");
    }, (err) => {
      console.error(err);
    }
    )
  }

}
