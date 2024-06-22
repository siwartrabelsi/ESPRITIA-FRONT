import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EspacesComponent } from './espaces/espaces.component';

const routes: Routes = [
  { path: '', redirectTo: '/espaces', pathMatch: 'full' },
  { path: 'espaces', component: EspacesComponent },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
