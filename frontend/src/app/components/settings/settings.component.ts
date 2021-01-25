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
  id="600ddfbf6229dd6df0040fe4";

  ngOnInit(): void {
    this.service.getAllUser().subscribe((res: any) => {
    this.userList = res;
    }),
         this.service.getUser(this.id).subscribe((res: any)=>{
        this.selectedUser=res;
      })
  }
  

  onsave(){
    this.service.updateUser(this.selectedUser,this.userData).subscribe((res)=>{

  }) 
}




}
