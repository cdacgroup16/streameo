import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider-component',
  templateUrl: './slider-component.component.html',
  styleUrls: ['./slider-component.component.scss']
})
export class SliderComponentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {



  }


  images = [
    { path: './assets/images/Green_Lantern.jpg' },
    { path: './assets/images/riseOfEmpire.jpg' },
    { path: './assets/images/Thor.jpg' },
    { path: './assets/images/Thor.jpg' },
    { path: './assets/images/Thor.jpg' },
    { path: './assets/images/Thor.jpg' },
    { path: './assets/images/Thor.jpg' },
    { path: './assets/images/Thor.jpg' },
    { path: './assets/images/Wakanda.jpg' }
  ];

}
