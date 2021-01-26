import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users/users.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogExampleComponent } from 'src/app/dialog-example/dialog-example.component';
import { User } from 'src/app/entities/users/user';
import { jitOnlyGuardedExpression } from '@angular/compiler/src/render3/util';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  constructor(private service: UsersService, public dialog: MatDialog) {}

  userData: User;
  selectedUser: any;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  id = JSON.parse(localStorage.getItem('token'));

  ngOnInit(): void {
    console.log(this.id);
    this.service.getUser(this.id).subscribe((res: any) => {
      this.selectedUser = res;
    });
  }

  onSave() {
    this.service.updateUser(this.selectedUser, this.userData).subscribe(
      (res) => {
        this.openDialog();
      },
      (error) => {
        this.openDialog();
      }
    );
  }
  //onSuccess(): void {
  // alert();
  //}
  openDialog() {
    this.dialog.open(DialogExampleComponent);
  }
}
