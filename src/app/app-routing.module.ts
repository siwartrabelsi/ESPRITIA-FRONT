import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EspacesComponent } from './back-office/espaces/espaces.component';
import { ClubListComponent } from './back-office/club-list/club-list.component';
import { ClubDetailComponent } from './back-office/club-detail/club-detail.component';
import { ClubFormComponent } from './back-office/club-form/club-form.component';
import { UpdateClubComponent } from './back-office/update-club/update-club.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { BackOfficeComponent } from './back-office/back-office.component';
import { UsersComponent } from './back-office/users/users.component';
import { SettingsComponent } from './back-office/settings/settings.component';
import { FrontOfficeComponent } from './front-office/front-office.component';
import { HomeComponent } from './front-office/home/home.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ReservationComponent } from './back-office/reservation/reservation.component';
import { CovoiturageListComponent } from './back-office/covoiturage-list/covoiturage-list.component';
import { CreateCovoiturageComponent } from './back-office/create-covoiturage/create-covoiturage.component';
import { EditCovoiturageComponent } from './back-office/edit-covoiturage/edit-covoiturage.component';
import { EvenementListComponent } from './back-office/evenement-list/evenement-list.component';
import { EvenementUpdateComponent } from './back-office/evenement-update/evenement-update.component';
import { EvenementDetailComponent } from './back-office/evenement-detail/evenement-detail.component';
import { EvenementFormComponent } from './back-office/evenement-form/evenement-form.component';
import { FormationListComponent } from './back-office/formation-list/formation-list.component';
import { AddFormationComponent } from './back-office/add-formation/add-formation.component';
import { ModifierFormationComponent } from './back-office/modifier-formation/modifier-formation.component';
import { FormationDetailComponent } from './back-office/formation-detail/formation-detail.component';
import { ParticipantListComponent } from './back-office/participant-list/participant-list.component';
import { AddParticipantComponent } from './back-office/add-participant/add-participant.component';
import { UpdateParticipantComponent } from './back-office/update-participant/update-participant.component';
import { ClubComponent } from './club/club.component';
import { ParticiperComponent } from './participer/participer.component';
import { EventformationComponent } from './eventformation/eventformation.component';
import { DetailclubComponent } from './detailclub/detailclub.component';
import { DashboardComponent } from './back-office/dashboard/dashboard.component';

import { CalendarComponent } from './back-office/calendar/calendar.component';
import { EspaceEventComponent } from './espace-event/espace-event.component';
import { CalendarFrontComponent } from './calendar-front/calendar-front.component';
import { ReservationEventComponent } from './reservation-event/reservation-event.component';
import { ResetPasswordConfirmComponent } from './reset-password-confirm/reset-password-confirm.component';
import { ReclamationsComponent } from './back-office/reclamations/reclamations.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'reset-password-confirm', component: ResetPasswordConfirmComponent },
  {
    path: 'back-office', component: BackOfficeComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component:DashboardComponent},
      { path: 'users', component: UsersComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'clubs', component: ClubListComponent },
      { path: 'clubs/:id', component: ClubDetailComponent },
      { path: 'add-club', component: ClubFormComponent },
      { path: 'update-club/:id', component: UpdateClubComponent },
      { path: 'espaces', component: EspacesComponent },
      { path: 'reservation', component: ReservationComponent },
      { path: 'covoiturages', component: CovoiturageListComponent },
      { path: 'create', component: CreateCovoiturageComponent },
      { path: 'edit/:id', component: EditCovoiturageComponent },
      { path: 'listEvent', component: EvenementListComponent },
      { path: 'createEvent', component: EvenementFormComponent },
      { path: 'edit/:id', component: EvenementFormComponent },
      { path: 'detailEvenement/:id', component: EvenementDetailComponent },
      { path: 'updateEvenement/:id', component: EvenementUpdateComponent },
      { path: 'calendar', component: CalendarComponent },
      { path: 'reclamations', component: ReclamationsComponent },
       {path: 'formations',component:FormationListComponent},
      {path: 'add-formation',component:AddFormationComponent},
      {path: 'modifier-formation/:id',component:ModifierFormationComponent},
      {path:'formations/:id',component:FormationDetailComponent},
      {path:'participants',component:ParticipantListComponent},
      {path:'add-participant',component:AddParticipantComponent},
      {path:'update-participant/:id',component:UpdateParticipantComponent}
    ]
  },
  { path: 'espaceEvent', component: EspaceEventComponent },
  { path: 'calendarFront', component: CalendarFrontComponent },
  { path: 'reservationEvent', component: ReservationEventComponent},
   {path: 'club',component:ClubComponent},
  {path: 'participer',component:ParticiperComponent},
  {path:'eventformation',component:EventformationComponent},
  {path:'detailclub/:id',component:DetailclubComponent},
  {
    path: 'front-office', component: FrontOfficeComponent, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent }

    ]
  },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
