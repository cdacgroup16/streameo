import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { User } from '../../entities/users/user';
// import { MatSnackBar } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
  subscription_plan: string;
  user: User;


  constructor(private auth: AuthService, private router: Router, private snack: MatSnackBar) { }

  ngOnInit(): void {
  }
  onSubmit = () => {
    const payload = {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      subscription_plan: this.subscription_plan

    }
    this.auth.signup(payload).subscribe(data => {

      const { token, user } = data;
      this.user = user;
      localStorage.setItem('token', JSON.stringify(token));
      localStorage.setItem('user', JSON.stringify(this.user));
      this.snack.open("Signed Up Success", "dismiss", { duration: 1000 });
      this.router.navigate(['/home']);
    },
      err => {
        this.snack.open("Signup Failed" + err.error?.message, "Dismiss", { duration: 1000 });
        // console.error('Signup failed \n', err.error?.message);
      });
  }

}



