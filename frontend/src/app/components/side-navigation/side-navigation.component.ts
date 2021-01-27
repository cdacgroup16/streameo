
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/entities/users/user';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.scss']
})
export class SideNavigationComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  opened = false;
  user: User;
  ngOnInit(): void { }

  getUser() {
    if (this.auth.isSignedIn()) {
      this.user = JSON.parse(localStorage.getItem('user'));
      return true
    }
    return false
  }

  loggedin() {
    return this.auth.isSignedIn()
  }
  admin() {
    return this.auth.isAdmin();
  }
  logout() {
    this.auth.logout();
    this.router.navigate(['/home']);

  }







}
