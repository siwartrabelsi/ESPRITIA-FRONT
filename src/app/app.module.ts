import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ClubListComponent } from './back-office/club-list/club-list.component';
import { ClubDetailComponent } from './back-office/club-detail/club-detail.component';
import { ClubFormComponent } from './back-office/club-form/club-form.component';
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
import { ClubMapComponent } from './club-map/club-map.component';
import { FormationListComponent } from './back-office/formation-list/formation-list.component';
import { AddFormationComponent } from './back-office/add-formation/add-formation.component';
import { UpdateClubComponent } from './back-office/update-club/update-club.component';
import { ModifierFormationComponent } from './back-office/modifier-formation/modifier-formation.component';
import { FormationDetailComponent } from './back-office/formation-detail/formation-detail.component';
import{ FullCalendarModule} from '@fullcalendar/angular';
import { CalendarComponent } from './calendar/calendar.component';
import { ParticipantListComponent } from './back-office/participant-list/participant-list.component';
import { AddParticipantComponent } from './back-office/add-participant/add-participant.component';
import { UpdateParticipantComponent } from './back-office/update-participant/update-participant.component';
import { ClubComponent } from './club/club.component';
import { ParticiperComponent } from './participer/participer.component';
import { EventformationComponent } from './eventformation/eventformation.component';
import { DetailclubComponent } from './detailclub/detailclub.component';
import { NgxPowerBiModule } from 'ngx-powerbi';
import { PowerBiDashboardComponent } from './power-bi-dashboard/power-bi-dashboard.component';






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
    ClubMapComponent,
    FormationListComponent,
    AddFormationComponent,
    ModifierFormationComponent,
    FormationDetailComponent,
    CalendarComponent,
    ParticipantListComponent,
    AddParticipantComponent,
    UpdateParticipantComponent,
    ClubComponent,
    ParticiperComponent,
    EventformationComponent,
    DetailclubComponent,
    PowerBiDashboardComponent
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    FullCalendarModule,
    NgxPowerBiModule

    
    
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
