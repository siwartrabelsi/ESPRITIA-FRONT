import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { EvenementListComponent } from './back-office/evenement-list/evenement-list.component';
import { EvenementUpdateComponent } from './back-office/evenement-update/evenement-update.component';
import { EvenementFormComponent } from './back-office/evenement-form/evenement-form.component';
import { EvenementDetailComponent } from './back-office/evenement-detail/evenement-detail.component';
import { CalendarComponent } from './back-office/calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { EspaceEventComponent } from './espace-event/espace-event.component';
import { CalendarFrontComponent } from './calendar-front/calendar-front.component';

import { EspaceDashboardComponent } from './espace-dashboard/espace-dashboard.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ReservationEventComponent } from './reservation-event/reservation-event.component';



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
    CalendarComponent,
    EspaceEventComponent,
    CalendarFrontComponent,
    EspaceDashboardComponent,
    ReservationEventComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    FullCalendarModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    //MatCardModule,
    //MatButtonModule
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
