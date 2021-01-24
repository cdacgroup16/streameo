import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  name: string;
  plan1: any;
  plan2: any;
  plan3: any;
  
}

const ELEMENT_DATA: PeriodicElement[] = [
  {name: 'detail', plan1 : "check", plan2: 'check', plan3: 'check'},
  {name: 'detail2', plan1: 'close', plan2: 'close', plan3: 'check'},
  {name: 'detail3', plan1: 'close', plan2: 'close', plan3: 'check'},
];


@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['name', 'plan1', 'plan2', 'plan3'];
  dataSource = ELEMENT_DATA;
  
//for check box
 checked = false;
 indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
 disabled = false;
}
