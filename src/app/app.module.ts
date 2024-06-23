import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ClubListComponent } from './club-list/club-list.component';
import { ClubDetailComponent } from './club-detail/club-detail.component';
import { ClubFormComponent } from './club-form/club-form.component';
import { UpdateClubComponent } from './update-club/update-club.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { AuthInterceptor } from './AuthInterceptor';
import { HomeComponent } from './front-office/home/home.component';
import { BackOfficeComponent } from './back-office/back-office.component';
import { DashboardComponent } from './back-office/dashboard/dashboard.component';
import { UsersComponent } from './back-office/users/users.component';
import { SettingsComponent } from './back-office/settings/settings.component';
import { FrontOfficeComponent } from './front-office/front-office.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';

@NgModule({
  declarations: [
    AppComponent,
    ClubListComponent,
    ClubDetailComponent,
    ClubFormComponent,
    UpdateClubComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    BackOfficeComponent,
    DashboardComponent,
    UsersComponent,
    SettingsComponent,
    FrontOfficeComponent,
    ForgetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor, // Add your interceptor service here
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
