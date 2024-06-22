import { Component, OnInit } from '@angular/core';
import { ClubService } from '../club.service';
import { Club } from '../club';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-club-list',
  templateUrl: './club-list.component.html',
  styleUrls: ['./club-list.component.css']
})
export class ClubListComponent implements OnInit {
  clubs: Club[] = [];
  searchTerm: string = '';
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;

  constructor(private clubService: ClubService) {}

  ngOnInit(): void {
    this.getClubs();
  }

  getClubs(): void {
    this.clubService.getClubs().subscribe(
      (data: Club[]) => {
        this.clubs = data;
      },
      (error) => {
        console.error('Error fetching clubs', error);
      }
    );
  }

  deleteClub(id: number): void {
    this.clubService.deleteClub(id).subscribe(() => {
      this.clubs = this.clubs.filter(club => club.id !== id);
    });
  }

  updateClub(id: number): void {
    const clubToUpdate = this.clubs.find((club) => club.id === id);
    if (clubToUpdate) {
      this.clubService.updateClub(id, clubToUpdate).subscribe(() => {
        console.log(`Club with ID ${id} updated successfully.`);
      });
    } else {
      console.error(`Club with ID ${id} not found.`);
    }
  }

  searchClubs(): void {
    if (this.searchTerm) {
      this.clubService.searchClubs(this.searchTerm).subscribe(
        (data: Club[]) => {
          this.clubs = data;
        },
        (error) => {
          console.error('Error searching clubs', error);
        }
      );
    } else {
      this.getClubs(); // Recharge la liste complète si le champ de recherche est vide
    }
  }

  likeClub(id: number): void {
    this.clubService.likeClub(id).subscribe(() => {
      console.log(`Liked club with ID ${id}`);
    });
  }

  dislikeClub(id: number): void {
    this.clubService.dislikeClub(id).subscribe(() => {
      console.log(`Disliked club with ID ${id}`);
    });
  }

  downloadPdf(clubId: number): void {
    this.clubService.downloadPdf(clubId).subscribe((data: Blob) => {
      const blob = new Blob([data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }

  generateQRCodeUrl(clubId: number): string {
    return this.clubService.getQRCodeUrl(clubId);
  }


  getTotalClubCount(): number {
    return this.clubs.length;
  }
  
  getTotalLikesCount(): number {
    // Calculer le total des likes à partir des clubs
    return this.clubs.reduce((totalLikes, club) => totalLikes + club.nbLikes, 0);
  }
  
  getTotalDislikesCount(): number {
    // Calculer le total des dislikes à partir des clubs
    return this.clubs.reduce((totalDislikes, club) => totalDislikes + club.nbDislikes, 0);
  }
  
}
