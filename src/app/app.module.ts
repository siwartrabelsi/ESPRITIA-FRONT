import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EvenementListComponent } from './evenement-list/evenement-list.component';
import { EvenementDetailComponent } from './evenement-detail/evenement-detail.component';
import { EvenementFormComponent } from './evenement-form/evenement-form.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EvenementUpdateComponent } from './evenement-update/evenement-update.component';


@NgModule({
  declarations: [
    AppComponent,
     EvenementListComponent,
    EvenementDetailComponent,
    EvenementFormComponent,
    EvenementUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
