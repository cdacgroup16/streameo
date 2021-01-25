import { Component, OnInit } from '@angular/core';
import { PlansService } from 'src/app/services/plans/plans.service';

export interface PeriodicElement {
  name: string;
  plan1: any;
  plan2: any;
  plan3: any;

}

const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Silver', plan1: "check", plan2: 'close', plan3: 'close' },
  { name: 'Golden', plan1: 'check', plan2: 'close', plan3: 'close' },
  { name: 'Platinum', plan1: 'check', plan2: 'check', plan3: 'check' },
];


@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {

  constructor(private service: PlansService) { }

  planList: any;
  ngOnInit(): void {
    this.service.getAllPlans().subscribe((res) => {
      this.planList = res;
      res.forEach(plan => {
        // console.log(plan);
        localStorage.setItem("plan", JSON.stringify(plan));
      });
      // console.log(JSON.stringify(res));
      // array.forEach(element => {

      // });

    })

  }


  displayedColumns: string[] = ['name', 'plan1', 'plan2', 'plan3'];
  dataSource = ELEMENT_DATA;

}

