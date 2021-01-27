import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PlansService } from 'src/app/services/plans/plans.service';

@Component({
  selector: 'app-planlist',
  templateUrl: './planlist.component.html',
  styleUrls: ['./planlist.component.scss']
})
export class PlanlistComponent implements OnInit {

  _id: any;

  constructor(private service: PlansService, private router: Router, private snack: MatSnackBar) { }
  planList: any;

  ngOnInit(): void {
    this.service.getAllPlans().subscribe((res) => {
      this.planList = res;
    })
  }

  onEdit(_id) {
    // console.log(_id);
    const url = '/editplans/' + _id;
    this.router.navigate([url], {
      queryParams: { 'id': this._id }
    });

  }

  remove(_id: number) {
    console.log(_id);
    this.service.deletePlan(_id).subscribe((res) => {
      this.snack.open(_id + "Removed Success", "Dismiss");
      console.log(res);
    }), (err) => {
      this.snack.open("Remove Failed" + err.error?.message, "Dismiss");
      console.log(err);
    };
  }
}