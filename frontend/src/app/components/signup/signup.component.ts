import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import {Router} from '@angular/router';

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
  subscription_plan : string;
  user: any;


  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  onSubmit = () => {
    this.user = {
      firstname: this.firstname,
      lastname: this.lastname,
      email:  this.email,
      password: this.password,
      subscription_plan: this.subscription_plan

    }
    this.auth.signup(this.user).subscribe(data => {

      const {  token, user} = data;
       this.user = user;
       localStorage.setItem('token', JSON.stringify(token));
      localStorage.setItem('user', JSON.stringify(this.user));
      this.router.navigate(['/home']);
    },
    err => {
      console.error('Signup failed \n', err.error?.message);
    });
  }

}



