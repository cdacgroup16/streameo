import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }

  slides = [
    { 'image': './assets/images/Green_Lantern.jpg' },
    { 'image': './assets/images/riseOfEmpire.jpg' },
    { 'image': './assets/images/Thor.jpg' },
    { 'image': './assets/images/Wakanda.jpg' }
  ];
}
