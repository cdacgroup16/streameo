import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AboutComponent } from './components/about/about.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { HomeComponent } from './components/pages/home/home.component';
import { PlansComponent } from './components/pages/plans/plans.component';
import { ContactusComponent } from './components/contactus/contactus.component'
import { TermandconditionComponent } from './components/termandcondition/termandcondition.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SignupComponent } from './components/signup/signup.component';
import { VideouploadComponent } from './components/videoupload/videoupload.component';
import { VideomanagementComponent } from './components/videomanagement/videomanagement.component';
import { ErrorComponent } from './components/error/error.component';
import { SigninComponent } from './components/signin/signin.component';
import { CategorylistComponent } from './components/categorylist/categorylist.component';
import { AddcategoriesComponent } from './components/addcategories/addcategories.component';
import { EditcategoryComponent } from './components/editcategory/editcategory.component'

// import { componentFactoryName } from '@angular/compiler';
import { UserlistComponent } from './components/userlist/userlist.component';
import { PlanlistComponent } from './components/planlist/planlist.component';
import { AddplansComponent } from './components/addplans/addplans.component';
import { EditplanComponent } from './components/editplan/editplan.component';
import { VideoComponent } from 'src/app/components/pages/video/video.component'
import { UpdateVideoComponent } from 'src/app/components/pages/update-video/update-video.component';

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
    component: SigninComponent,
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
  },
  {
    path: 'checkout/:id',
    component: CheckoutComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'videomanagement',
    component: VideomanagementComponent
  },
  {
    path: 'videoupload',
    component: VideouploadComponent
  },
  {
    path: 'categorylist',
    component: CategorylistComponent
  },

  {
    path: 'addcategory',
    component: AddcategoriesComponent
  },
  {
    path: 'editcategory/:id',
    component: EditcategoryComponent
  },
  {
    path: 'planlist',
    component: PlanlistComponent
  }
  ,
  {
    path: 'userlist',
    component: UserlistComponent
  },
  {
    path: 'addplans',
    component: AddplansComponent
  },
  {
    path: 'editplans/:id',
    component: EditplanComponent
  },
  {

    path: 'video',
    component: VideoComponent
  },
  {
    path: 'contactus',
    component: ContactusComponent
  },
  {
    path: 'termsandconditions',
    component: TermandconditionComponent
  },
  {
    path: '**',
    component: ErrorComponent
  },
  {
    path: 'updatevideo/:videoId',
    component: UpdateVideoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
