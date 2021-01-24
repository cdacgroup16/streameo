import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';

import { MatIconModule } from '@angular/material/icon';
import { NavigationComponent } from './components/navigation/navigation.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { CarouselComponent } from './components/carousel/carousel.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { PlansComponent } from './components/pages/plans/plans.component';
import { MatTableModule } from '@angular/material/table';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { FooterComponent } from './components/footer/footer.component';
import { SliderComponentComponent } from './components/slider-component/slider-component.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    CarouselComponent,
    HomeComponent,
    LoginComponent,
    PlansComponent,
    DashboardComponent,
    FooterComponent,
    SliderComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCarouselModule.forRoot(),
    MatTableModule,
    MatGridListModule,
    HttpClientModule,
    IvyCarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent, NavigationComponent]
})
export class AppModule { }
