import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { CarouselComponent } from './components/carousel/carousel.component';
import { HomeComponent } from './components/pages/home/home.component';
import { PlansComponent } from './components/pages/plans/plans.component';
import { MatTableModule } from '@angular/material/table';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { FooterComponent } from './components/footer/footer.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SideNavigationComponent } from './components/side-navigation/side-navigation.component';
import { AboutComponent } from './components/about/about.component';
import { SliderComponentComponent } from './components/slider-component/slider-component.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlanComponent } from './components/plan/plan.component';
import { MatRadioModule } from '@angular/material/radio';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { MatInputModule } from '@angular/material/input';
import { TermandconditionComponent } from './components/termandcondition/termandcondition.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { MatCardModule } from '@angular/material/card';
import { SettingsComponent } from './components/settings/settings.component';
import { MatTabsModule } from '@angular/material/tabs';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { VideomanagementComponent } from './components/videomanagement/videomanagement.component';
import { VideouploadComponent } from './components/videoupload/videoupload.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatDialogModule } from '@angular/material/dialog';
import { ErrorComponent } from './components/error/error.component';
import { CategorylistComponent } from './components/categorylist/categorylist.component';
import { AddcategoriesComponent } from './components/addcategories/addcategories.component';
import { EditcategoryComponent } from './components/editcategory/editcategory.component';
import { PlanlistComponent } from './components/planlist/planlist.component';
import { UserlistComponent } from './components/userlist/userlist.component';
import { AddplansComponent } from './components/addplans/addplans.component';
import { EditplanComponent } from './components/editplan/editplan.component';

import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { VideoComponent } from './components/pages/video/video.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { VideoCardComponent } from './components/video-card/video-card.component';
import { UpdateVideoComponent } from './components/pages/update-video/update-video.component';
@NgModule({
  declarations: [
    AppComponent,
    CarouselComponent,
    HomeComponent,
    PlansComponent,
    DashboardComponent,
    FooterComponent,
    SideNavigationComponent,
    AboutComponent,
    SliderComponentComponent,
    PlanComponent,
    CheckoutComponent,
    TermandconditionComponent,
    ContactusComponent,

    SettingsComponent,
    // LoginComponent,
    SignupComponent,
    SigninComponent,
    VideouploadComponent,
    VideomanagementComponent,
    VideouploadComponent,
    ErrorComponent,
    CategorylistComponent,
    AddcategoriesComponent,
    EditcategoryComponent,
    PlanlistComponent,
    UserlistComponent,
    AddplansComponent,
    EditplanComponent,
    VideoPlayerComponent,
    VideoComponent,
    VideoCardComponent,
    UpdateVideoComponent
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
    MatSidenavModule,
    FormsModule,
    MatCardModule,
    IvyCarouselModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatInputModule,
    MatChipsModule,
    MatSelectModule,
    OverlayModule,
    MatDialogModule,
    MatTabsModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
