import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvenementListComponent } from './evenement-list/evenement-list.component';
import { EvenementDetailComponent } from './evenement-detail/evenement-detail.component';
import { EvenementFormComponent } from './evenement-form/evenement-form.component';
import { EvenementUpdateComponent } from './evenement-update/evenement-update.component';


const routes: Routes = [
  { path: 'listEvent', component: EvenementListComponent },
  { path: 'create', component: EvenementFormComponent },
  { path: 'edit/:id', component: EvenementFormComponent },
  { path: 'detailEvenement/:id', component: EvenementDetailComponent },
  { path: 'updateEvenement/:id', component: EvenementUpdateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
