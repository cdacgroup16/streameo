import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {

  constructor(private service: PlansService) { }

  ngOnInit(): void {
    this.service.getAllPlans().subscribe((res) => {
      this.planList = res;
  })
  }

}
