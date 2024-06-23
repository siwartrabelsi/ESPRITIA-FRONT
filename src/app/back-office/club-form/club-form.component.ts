import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClubService } from '../../club.service';
import { Club } from '../../club';

@Component({
  selector: 'app-club-form',
  templateUrl: './club-form.component.html',
  styleUrls: ['./club-form.component.css']
})
export class ClubFormComponent {
  club: Club = {
    id: 0,
    nom: '',
    description: '',
    members: [],
    evenements: [],
    nbLikes: 0,
    nbDislikes: 0 
  };

  constructor(private clubService: ClubService, private router: Router) {}

  save(): void {
    this.clubService.createClub(this.club).subscribe(() => this.router.navigate(['/back-office/clubs']));
  }
}
