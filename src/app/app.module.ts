import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ClubListComponent } from './club-list/club-list.component';
import { ClubDetailComponent } from './club-detail/club-detail.component';
import { ClubFormComponent } from './club-form/club-form.component';
import { UpdateClubComponent } from './update-club/update-club.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ClubListComponent,
    ClubDetailComponent,
    ClubFormComponent,
    UpdateClubComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
