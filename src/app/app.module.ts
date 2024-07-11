import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ClubListComponent } from './back-office/club-list/club-list.component';
import { ClubDetailComponent } from './back-office/club-detail/club-detail.component';
import { ClubFormComponent } from './back-office/club-form/club-form.component';
import { UpdateClubComponent } from './back-office/update-club/update-club.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EspacesComponent } from './back-office/espaces/espaces.component';
import { ReservationComponent } from './back-office/reservation/reservation.component';
import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { AuthInterceptor } from './AuthInterceptor';
import { HomeComponent } from './front-office/home/home.component';
import { BackOfficeComponent } from './back-office/back-office.component';
import { DashboardComponent } from './back-office/dashboard/dashboard.component';
import { UsersComponent } from './back-office/users/users.component';
import { SettingsComponent } from './back-office/settings/settings.component';
import { FrontOfficeComponent } from './front-office/front-office.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { CovoiturageListComponent } from './back-office/covoiturage-list/covoiturage-list.component';
import { CreateCovoiturageComponent } from './back-office/create-covoiturage/create-covoiturage.component';
import { EditCovoiturageComponent } from './back-office/edit-covoiturage/edit-covoiturage.component';
import { CoiturageFrontComponent } from './front-office/coiturage-front/coiturage-front.component';

import { EvenementListComponent } from './back-office/evenement-list/evenement-list.component';
import { EvenementUpdateComponent } from './back-office/evenement-update/evenement-update.component';
import { EvenementFormComponent } from './back-office/evenement-form/evenement-form.component';
import { EvenementDetailComponent } from './back-office/evenement-detail/evenement-detail.component';
import { CovoiturageService } from './services/covoiturage.service';
import { ListCovoiturageFontComponent } from './front-office/list-covoiturage-font/list-covoiturage-font.component';

@NgModule({
  declarations: [
    AppComponent,
    EspacesComponent,
    ReservationComponent,
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
    ForgetPasswordComponent,
    CovoiturageListComponent,
    CreateCovoiturageComponent,
    EditCovoiturageComponent,
    EvenementListComponent,
    EvenementDetailComponent,
    EvenementFormComponent,
    EvenementUpdateComponent,
    CoiturageFrontComponent,
    ListCovoiturageFontComponent,     
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    
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
