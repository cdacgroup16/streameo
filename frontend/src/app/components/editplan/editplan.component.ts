import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Plans } from '../../entities/plans/plans';
import { ActivatedRoute, Router } from '@angular/router';
import { PlansService } from 'src/app/services/plans/plans.service';
import { ThrowStmt } from '@angular/compiler';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-editplan',
  templateUrl: './editplan.component.html',
  styleUrls: ['./editplan.component.scss']
})
export class EditplanComponent implements OnInit {


  _id: string;
  planDetails: Plans;

  constructor(private auth: AuthService, private router: Router, private act: ActivatedRoute, private plan: PlansService, private snack: MatSnackBar) { }

  ngOnInit(): void {
    if (!(this.auth.isSignedIn() && this.auth.isAdmin())) {
      this.snack.open('You\'re not an admin', "Dismiss", { duration: 3000 });
      this.router.navigate(['/home'])
      return
    }

    this.act.params.subscribe(params => {
      this._id = params.id;
      // console.log(this._id);

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

        console.log("Updated");
        this.snack.open("Plan Updated Success", "Dismiss", { duration: 1000 });
      },
        (err) => {
          this.snack.open("Erroe " + err.error?.message, "Dismiss", { duration: 1000 });
          console.log("error", err);

        });
    }
    else {
      console.log("not Signed In");

    }

  }

}

















