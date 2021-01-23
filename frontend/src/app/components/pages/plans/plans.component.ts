import { Component, OnInit } from '@angular/core';
import { PlansService } from 'src/app/services/plans/plans.service';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {

  // constructor() { }
  constructor(private service: PlansService) { }
  planList: any;
  ngOnInit(): void {
    this.service.getAllPlans().subscribe((res) => {
      this.planList = res;
    })
  }
}
