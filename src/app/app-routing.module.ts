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
import { DashboardComponent } from './back-office/dashboard/dashboard.component';
import { UsersComponent } from './back-office/users/users.component';
import { SettingsComponent } from './back-office/settings/settings.component';
import { FrontOfficeComponent } from './front-office/front-office.component';
import { HomeComponent } from './front-office/home/home.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ReservationComponent } from './back-office/reservation/reservation.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  {
    path: 'back-office', component: BackOfficeComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: UsersComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'clubs', component: ClubListComponent },
      { path: 'clubs/:id', component: ClubDetailComponent },
      { path: 'add-club', component: ClubFormComponent },
      { path: 'update-club/:id', component: UpdateClubComponent },
      { path: 'espaces', component: EspacesComponent },
      { path: 'reservation', component: ReservationComponent },
    ]
  },
  {
    path: 'front-office', component: FrontOfficeComponent, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
    ]
  },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
