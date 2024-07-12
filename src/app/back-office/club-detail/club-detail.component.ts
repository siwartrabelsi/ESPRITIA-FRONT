import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClubService } from '../../club.service';
import { Club } from '../../club';
import * as L from 'leaflet'; // Import de Leaflet

@Component({
  selector: 'app-club-detail',
  templateUrl: './club-detail.component.html',
  styleUrls: ['./club-detail.component.css']
})
export class ClubDetailComponent implements OnInit {
  club: Club | undefined;
  id!: number;
  pointsFidelite: number = 0;
  map: L.Map | undefined;
  selectedFiles: { [key: number]: File } = {}; 
  clubs: Club[] = [];

  constructor(
    private route: ActivatedRoute,
    private clubService: ClubService,
    @Inject(Router) private router: Router // Utilisation de @Inject pour spécifier Router comme token d'injection
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== null) {
        this.id = +id;
        this.getClubPointsFidelite();
        this.getClub();
      }
    });
  }

  navigateToList(): void {
    this.router.navigate(['/back-office/clubs']);
  }

  getClub(): void {
    this.clubService.getClub(this.id)
      .subscribe(club => {
        this.club = club;
        // Après avoir récupéré le club, initialisez la carte
        this.initMap();
      });
  }

  initMap(): void {
    if (this.club && this.club.latitude && this.club.longitude) {
      // Initialize the map
      this.map = L.map('map').setView([this.club.latitude, this.club.longitude], 13);

      // Add OpenStreetMap base layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'OpenStreetMap'
      }).addTo(this.map);

      // Add marker for the club
      const marker = L.marker([this.club.latitude, this.club.longitude]).addTo(this.map);

      // Add popup with club details
      marker.bindPopup(`<b>${this.club.nom}</b><br>${this.club.objectif}`).openPopup();
    }
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

  getClubPointsFidelite(): void {
    this.clubService.getClubPointsFidelite(this.id).subscribe(
      (points: number) => {
        this.pointsFidelite = points;
      },
      (error) => {
        console.error('Error fetching club points de fidélité', error);
      }
    );
  }
  
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
