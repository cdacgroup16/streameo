import { Component, OnInit } from '@angular/core';
import{UsersService} from 'src/app/services/users/users.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private service: UsersService) { }

  userData:any;
  userList: any;
  selectedUser: any;

  ngOnInit(): void {
    this.service.getAllUser().subscribe((res: any) => {
    this.userList = res;
    })
  }

  getid(id: any ){
    this.service.getUser(id).subscribe((res: any)=>{
      this.selectedUser=res;
    })
  }

  onsave(){
    this.service.updateUser(this.selectedUser,this.userData).subscribe((res)=>{

  }) 
}
}


