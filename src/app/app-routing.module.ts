import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClubListComponent } from './club-list/club-list.component';
import { ClubDetailComponent } from './club-detail/club-detail.component';
import { ClubFormComponent } from './club-form/club-form.component';
import { UpdateClubComponent } from './update-club/update-club.component';
const routes: Routes = [
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
