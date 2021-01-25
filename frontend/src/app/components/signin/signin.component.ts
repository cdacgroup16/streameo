import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  email: string;
  password: string;
  user: any;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  onSubmit = () => {
    this.auth.signin(this.email, this.password).subscribe(data => {
      const {  token, user} = data;
      this.user = user;
      localStorage.setItem('token', JSON.stringify(token));
      localStorage.setItem('user', JSON.stringify(this.user));
      this.router.navigate(['/home']);
    },
    err => {
      console.error('Login failed \n', err.error?.message);
    });
  }

}

