import { Component, OnInit } from '@angular/core';
import { UsersService} from 'src/app/services/users/users.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {

  constructor(private service: UsersService) { }
  userList: any;
  planList : any;
  ngOnInit(): void {
    this.service.getAllUser().subscribe((res) => {
      this.userList = res;
  })  
}
}
