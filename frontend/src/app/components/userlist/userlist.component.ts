import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {

  constructor(private service: UsersService, private auth: AuthService, private router: Router, private snack: MatSnackBar) { }
  userList: any;
  planList: any;
  ngOnInit(): void {
    if (!(this.auth.isSignedIn() && this.auth.isAdmin())) {
      this.snack.open('You\'re not an admin', "Dismiss", { duration: 3000 });
      this.router.navigate(['/home'])
      return
    }

    this.service.getAllUser().subscribe((res) => {
      this.userList = res;
    })
  }
}
