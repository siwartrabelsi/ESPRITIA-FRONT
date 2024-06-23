import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClubListComponent } from './club-list/club-list.component';
import { ClubDetailComponent } from './club-detail/club-detail.component';
import { ClubFormComponent } from './club-form/club-form.component';
import { UpdateClubComponent } from './update-club/update-club.component';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { BackOfficeComponent } from './back-office/back-office.component';
import { DashboardComponent } from './back-office/dashboard/dashboard.component';
import { UsersComponent } from './back-office/users/users.component';
import { SettingsComponent } from './back-office/settings/settings.component';
import { FrontOfficeComponent } from './front-office/front-office.component';
import { HomeComponent } from './front-office/home/home.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {path: 'forget-password', component: ForgetPasswordComponent},
  { path: 'back-office', component: BackOfficeComponent, children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'users', component: UsersComponent },
    { path: 'settings', component: SettingsComponent }
  ]},
  { path: 'front-office', component: FrontOfficeComponent, children: [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
  ]},
  { path: '**', redirectTo: '/login' },
  { path: '', redirectTo: 'clubs', pathMatch: 'full' },
  { path: 'clubs', component: ClubListComponent },
  { path: 'clubs/:id', component: ClubDetailComponent },
  { path: 'add-club', component: ClubFormComponent },
  { path: 'update-club/:id', component: UpdateClubComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
