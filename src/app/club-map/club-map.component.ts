import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Club } from '../club';
import { ClubService } from '../club.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-club-map',
  templateUrl: './club-map.component.html',
  styleUrls: ['./club-map.component.css']
})
export class ClubMapComponent implements OnInit {
  private map: L.Map | undefined;
  private readonly defaultZoomLevel = 12;
  private readonly defaultIcon = L.icon({
    iconUrl: 'assets/marker-icon.png',
    shadowUrl: 'assets/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  clubs: Club[] = [];

  constructor(private clubService: ClubService, private router: Router) {}

  ngOnInit(): void {
    this.initializeMap();
    this.loadClubs();
  }

  private initializeMap(): void {
    this.map = L.map('map', {
      center: [36.8065, 10.1815], // Tunis ou votre position par défaut
      zoom: this.defaultZoomLevel
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }

  private loadClubs(): void {
    this.clubService.getClubs().subscribe((clubs: Club[]) => {
      this.clubs = clubs;
      this.addMarkersToMap();
    });
  }

  private addMarkersToMap(): void {
    this.clubs.forEach(club => {
      const marker = L.marker([club.latitude, club.longitude], { icon: this.defaultIcon })
        .addTo(this.map!)
        .bindPopup(`<b>${club.nom}</b>`)
        .on('click', () => this.navigateToClubDetail(club.id)); // Ajouter un événement de clic au marqueur
    });
  }

  private navigateToClubDetail(clubId: number): void {
    this.router.navigate(['/back-office/clubs', clubId]); // Utiliser clubId au lieu de club.id
  }
}
