import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AboutComponent } from './components/about/about.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { PlansComponent } from './components/pages/plans/plans.component';
import {TermandconditionComponent} from './components/termandcondition/termandcondition.component';
import {SettingsComponent} from './components/settings/settings.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'plans',
    component: PlansComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'termandcondition',
    component: TermandconditionComponent
  },
  {
    path: 'about',
    component: AboutComponent
  }
  ,
{
  path: 'checkout',
    component: CheckoutComponent
},
  {
    path:'settings',
    component: SettingsComponent 
  },
{
  path:'signup',
  component: SignupComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
