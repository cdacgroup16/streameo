import { Component, OnInit } from '@angular/core';
import {  SideNavigationComponent } from '../side-navigation/side-navigation.component';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // SideNavigationComponent.opened;
  }
  opened =false;

}
