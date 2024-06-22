import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CovoiturageListComponent } from './components/covoiturage-list/covoiturage-list.component';
import { CreateCovoiturageComponent } from './components/create-covoiturage/create-covoiturage.component';
import { EditCovoiturageComponent } from './components/edit-covoiturage/edit-covoiturage.component';

const routes: Routes = [
  { path: '', redirectTo: '/covoiturages', pathMatch: 'full' },
  { path: 'covoiturages', component: CovoiturageListComponent },
  { path: 'create', component: CreateCovoiturageComponent },
  { path: 'edit/:id', component: EditCovoiturageComponent },
  // Autres routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
