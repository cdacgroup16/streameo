import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Plans } from '../../entities/plans/plans';
import { Router } from '@angular/router';
import { PlansService } from 'src/app/services/plans/plans.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-addplans',
  templateUrl: './addplans.component.html',
  styleUrls: ['./addplans.component.scss']
})
export class AddplansComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router, private plan: PlansService, private snack: MatSnackBar) { }

  name: string;
  price: Number;
  concurrent_streams: Number;
  validity: Number;
  max_quality: Number;
  plansadd: any;

  ngOnInit(): void {
    if (!(this.auth.isSignedIn() && this.auth.isAdmin())) {
      this.snack.open('You\'re not an admin', "Dismiss", { duration: 3000 });
      this.router.navigate(['/home'])
      return
    }

  }
  onSubmit() {
    const payload = {
      name: this.name,
      price: this.price,
      concurrent_streams: this.concurrent_streams,
      validity: this.validity,
      max_quality: this.max_quality
    }
    console.log(payload);
    if (this.auth.isSignedIn()) {
      this.plan.postNewPlan(payload).subscribe((res) => {
        console.log(res)
        this.snack.open("Adding Success", "Dismiss", { duration: 1000 });
      }, (err) => {
        this.snack.open("Adding Failed" + err.error?.message, "Dismiss", { duration: 1000 });
        console.log("error", err);
      })
    }
    else {
      console.log("user not signed in");
    }
    // this.auth.signup(payload).subscribe(data => {

    //   const { plansadd } = data;
    //   this.plansadd = plansadd;
    //   localStorage.setItem('plansadd', JSON.stringify(this.plansadd));
    //   this.router.navigate(['/planlist']);
    // },
    //   err => {
    //     console.error('plansadd failed \n', err.error?.message);
    //   });
  }
}