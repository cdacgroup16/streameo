import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Plans } from '../../entities/plans/plans';
import { ActivatedRoute, Router } from '@angular/router';
import { PlansService } from 'src/app/services/plans/plans.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-editplan',
  templateUrl: './editplan.component.html',
  styleUrls: ['./editplan.component.scss']
})
export class EditplanComponent implements OnInit {


  _id: string;
  planDetails: Plans;

  constructor(private auth: AuthService, private router: Router, private act: ActivatedRoute, private plan: PlansService) { }

  ngOnInit(): void {
    this.act.params.subscribe(params => {
      this._id = params.id;
      console.log(this._id);

      this.plan.getPlan(this._id).subscribe((res) => {
        this.planDetails = res;
      },
        (err) => {
          console.log("error", err.err?.message);
        });
    })

  }

  onSubmit() {
    // console.log(this.planDetails);
    if (this.auth.isSignedIn()) {
      this.plan.updatePlan(this._id, this.planDetails).subscribe((res) => {
        ;
        console.log("Updated");
      },
        (err) => {
          console.log("error", err);

        });
    }
    else {
      console.log("not Signed In");

    }

  }

}

















