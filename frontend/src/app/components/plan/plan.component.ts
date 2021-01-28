import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PlansService } from 'src/app/services/plans/plans.service';

export interface PeriodicElement {
  name: string;
  plan1: any;
  plan2: any;
  plan3: any;

}

const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Bronze', plan1: "check", plan2: 'close', plan3: 'close' },
  { name: 'Silver', plan1: 'check', plan2: 'check', plan3: 'close' },
  { name: 'Gold', plan1: 'check', plan2: 'check', plan3: 'check' },
];


@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {

  constructor(private service: PlansService, private router: Router, private auth: AuthService) { }

  displayedColumns: string[] = ['name', 'plan1', 'plan2', 'plan3'];
  dataSource = ELEMENT_DATA;

  planList: any;
  selectedPlan: string;
  ngOnInit(): void {

    this.service.getAllPlans().subscribe((res) => {
      this.planList = res;
      localStorage.setItem("plans", JSON.stringify(res));
    },
      err => {
        console.log('Signup failed \n', err.error?.message);
      })
  }
  BtnChange(event) {
    this.selectedPlan = event.value;
  };

  onClick(): any {
    // console.log(this.selectedPlan);
    if (this.auth.isSignedIn()) {
      const url = '/checkout' + this.selectedPlan;
      this.router.navigate(['/checkout', this.selectedPlan], {
        queryParams: { 'id': this.selectedPlan }
      });
    }
    else {
      this.router.navigate(['/login']);
    }
  }

}

