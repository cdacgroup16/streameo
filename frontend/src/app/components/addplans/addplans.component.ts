import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Plans } from '../../entities/plans/plans';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addplans',
  templateUrl: './addplans.component.html',
  styleUrls: ['./addplans.component.scss']
})
export class AddplansComponent implements OnInit {

  name: String;
  price :number;
  concurrent_streams :number;
  validity: number;
  max_quality:number;
  plansadd : Plans;

  constructor(private  auth:AuthService, private router: Router) { }
 
  

  ngOnInit(): void {
    
  }
  onSubmit(){
      console.log(this.plansadd);
      const payload = {
      name: this.name,
      price: this.price,
      concurrent_streams: this.concurrent_streams,
      validity: this.validity,
      max_quality: this.max_quality
  }
  this.auth.signup(payload).subscribe(data => {

    const { plansadd } = data;
    this.plansadd = plansadd;
    localStorage.setItem('plansadd', JSON.stringify(this.plansadd));
    this.router.navigate(['/planlist']);
  },
    err => {
      console.error('plansadd failed \n', err.error?.message);
    });
}
}