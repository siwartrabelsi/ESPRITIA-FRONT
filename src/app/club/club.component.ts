


import { Chart, registerables } from 'chart.js';
import { Club } from '../club';
import { faFileDownload, faFilePdf, faInfoCircle, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { Component } from '@angular/core';
import { ClubService } from '../club.service';
@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css']
})
export class ClubComponent {

  clubs: Club[] = [];
  searchTerm: string = '';
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  faFileDownload = faFileDownload;
  faInfoCircle = faInfoCircle;
  faFilePdf = faFilePdf;
  chart: any;
  selectedFiles: { [key: number]: File } = {}; 
  // Propriétés pour les statistiques
  totalClubCount: number = 0;
  totalLikesCount: number = 0;
  totalDislikesCount: number = 0
  constructor(private clubService: ClubService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.getClubs();
  }

  getClubs(): void {
    this.clubService.getClubs().subscribe(
      (data: Club[]) => {
        this.clubs = data;
        this.renderChart();
        this.updateStatistics();
      },
      (error) => {
        console.error('Error fetching clubs', error);
      }
    );
  }

  deleteClub(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce club ?')) {
      this.clubService.deleteClub(id).subscribe(() => {
        this.clubs = this.clubs.filter(club => club.id !== id);
        this.updateStatistics();
        this.renderChart();
      });
    }
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
    this.clubService.likeClub(id).subscribe(
      () => {
        const club = this.clubs.find(club => club.id === id);
        if (club) {
          club.nbLikes += 1;
          this.updateStatistics(); // Mettre à jour les statistiques après un like
          this.renderChart();
        }
      },
      (error) => {
        console.error('Error liking club', error);
      }
    );
  }

  dislikeClub(id: number): void {
    this.clubService.dislikeClub(id).subscribe(
      () => {
        const club = this.clubs.find(club => club.id === id);
        if (club) {
          club.nbDislikes += 1;
          this.updateStatistics(); // Mettre à jour les statistiques après un dislike
          this.renderChart();
        }
      },
      (error) => {
        console.error('Error disliking club', error);
      }
    );
  }
  updateStatistics(): void {
    this.totalClubCount = this.getTotalClubCount();
    this.totalLikesCount = this.getTotalLikesCount();
    this.totalDislikesCount = this.getTotalDislikesCount();
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
  renderChart(): void {
    const labels = this.clubs.map(club => club.nom);
    const likesData = this.clubs.map(club => club.nbLikes);
    const dislikesData = this.clubs.map(club => club.nbDislikes);
  
    if (this.chart) {
      this.chart.destroy(); // Détruire le graphique existant s'il y en a un pour éviter les duplications
    }
  
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'bar', // Changer le type de graphique à 'bar' pour un graphique en barres
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Likes',
              data: likesData,
              backgroundColor: 'rgba(0, 123, 255, 0.2)', // Couleur de remplissage sous la barre des likes
              borderColor: '#007BFF', // Couleur de la barre des likes
              borderWidth: 2,
            },
            {
              label: 'Dislikes',
              data: dislikesData,
              backgroundColor: 'rgba(220, 53, 69, 0.2)', // Couleur de remplissage sous la barre des dislikes
              borderColor: '#DC3545', // Couleur de la barre des dislikes
              borderWidth: 2,
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Clubs'
              }
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Votes'
              }
            }
          }
        }
      });
    }}
    onFileSelected(event: any, clubId: number): void {
      const file: File = event.target.files[0];
      this.selectedFiles[clubId] = file;
    }
  
   uploadPhoto(clubId: number): void {
    const file = this.selectedFiles[clubId];
    if (file) {
      const formData = new FormData();
      formData.append('file', file, file.name);
  
      this.clubService.uploadPhoto(clubId, formData).subscribe(
        (response) => {
          // Mettre à jour l'URL de la photo du club après téléchargement
          const club = this.clubs.find(club => club.id === clubId);
          if (club) {
            club.photo = response.photo; // Assurez-vous que la structure de la réponse correspond à ce que vous attendez
          }
        },
        (error) => {
          console.error('Error uploading photo', error);
        }
      );
    }
  }
  }
