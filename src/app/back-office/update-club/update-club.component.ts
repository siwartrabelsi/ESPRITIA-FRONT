import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClubService } from '../../club.service';
import { Club } from '../../club';

@Component({
  selector: 'app-update-club',
  templateUrl: './update-club.component.html',
  styleUrls: ['./update-club.component.css']
})
export class UpdateClubComponent implements OnInit {
  club: Club = { id: 0, nom: '', objectif: '',   date: new Date(), members: [], evenements: [], nbLikes: 0, nbDislikes: 0, pointsFidelite: 0, latitude: 0, longitude: 0,formations: []  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clubService: ClubService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.clubService.getClub(id).subscribe((club) => (this.club = club));
  }

  updateClub(): void {
    this.clubService.updateClub(this.club.id, this.club).subscribe(() => {
      this.router.navigate(['/clubs']);
    });
  }
}
