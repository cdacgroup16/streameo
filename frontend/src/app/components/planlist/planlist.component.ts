import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PlansService } from 'src/app/services/plans/plans.service';

@Component({
  selector: 'app-planlist',
  templateUrl: './planlist.component.html',
  styleUrls: ['./planlist.component.scss']
})
export class PlanlistComponent implements OnInit {

  _id: any;

  constructor(private service: PlansService, private router: Router, private snack: MatSnackBar, private auth: AuthService) { }
  planList: any;

  ngOnInit(): void {
    if (!(this.auth.isSignedIn() && this.auth.isAdmin())) {
      this.snack.open('You\'re not an admin', "Dismiss", { duration: 3000 });
      this.router.navigate(['/home'])
      return
    }

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
      this.snack.open(_id + "Removed Success", "Dismiss", { duration: 1000 });
      console.log(res);
    }), (err) => {
      this.snack.open("Remove Failed" + err.error?.message, "Dismiss", { duration: 1000 });
      console.log(err);
    };
  }
}