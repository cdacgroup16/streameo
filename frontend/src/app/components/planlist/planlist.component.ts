import { Component, OnInit } from '@angular/core';
import { PlansService } from 'src/app/services/plans/plans.service';

@Component({
  selector: 'app-planlist',
  templateUrl: './planlist.component.html',
  styleUrls: ['./planlist.component.scss']
})
export class PlanlistComponent implements OnInit {
  
  constructor(private service: PlansService) { }
  planList : any;
  ngOnInit(): void {
    this.service.getAllPlans().subscribe((res) => {
      this.planList = res;
  })
  
}
}
