
import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_FACTORY } from '@angular/cdk/overlay/overlay-directives';
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
 

  
  ngOnInit(): void {
   
  }



}
