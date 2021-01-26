
import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.scss']
})
export class SideNavigationComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  opened = false;
  loginbtn = true;
  logoutbtn = false;
  // style = "display:none";
  admin = false;
  // login = false;
  // login = true;
  isLogin = false;
  // local = this.auth.isSignedIn();
  logout() {
    this.auth.logout();

    this.router.navigate(['/login']);
    // window.location.reload();
  }

  RecieveState(newItem: boolean) {
    console.log(newItem);
  }
  ngOnInit(): void {
    if ((this.auth.isSignedIn())) {
      // let load = false;
      this.loginbtn = false;
      this.logoutbtn = true;
      // console.log(local);
    }
  }



}
