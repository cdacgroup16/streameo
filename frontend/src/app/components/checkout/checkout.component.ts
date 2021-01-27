import { Component, OnInit } from '@angular/core';
import { Plans } from '../../entities/plans/plans';
import { ActivatedRoute, Router } from '@angular/router';
import { JsonpClientBackend } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  constructor(private router: ActivatedRoute, private myroute: Router, private snack: MatSnackBar) { }

  plan: Plans;
  id: any;
  Quantity: any;

  ngOnInit(): void {

    this.router.queryParams.subscribe(params => {
      this.id = (params).id;

      const getData = JSON.parse(window.localStorage.getItem("plans"));
      getData.forEach(el => {
        if (el._id == this.id) {
          this.plan = el;
        }
      });
    },
      err => {
        this.snack.open("Error" + err.error?.message , "Dismiss");
        console.error('Error ', err.err?.message);
        this.myroute.navigate(['/plans']);
      });
  }
  Pay() {
    let mon = 30;
    let res: number = mon * this.Quantity
    console.log(this.plan.id);
    console.log("Month" + res);
    this.snack.open("Plan Purchased" , "Dismiss");
    alert("Month  : " + res + " Plan ID IS: " + JSON.stringify(this.plan));
    window.localStorage.removeItem("plans");
  }

}
