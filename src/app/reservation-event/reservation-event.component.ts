import { Component } from '@angular/core';
import { Reservation } from '../reservation';
import { Espace } from '../espace';
import { TypeEquipement } from '../typeEquipement';
import { ReservationService } from '../Reservations services/reservation.service';
import { EspaceService } from '../Espaces services/espace.service';
import {Chart} from 'chart.js'; // Importer Chart.js

@Component({
  selector: 'app-reservation-event',
  templateUrl: './reservation-event.component.html',
  styleUrls: ['./reservation-event.component.css']
})
export class ReservationEventComponent {
  reservations: Reservation[] = [];
  espaces: Espace[] = [];
  selectedReservation: Reservation = new Reservation(
    0, 
    new Date(), 
    new Date(), 
    '', 
    '', 
    0, 
    '', 
    '', 
    0, // Remplacez cette valeur par un numéro approprié, par exemple l'ID de l'espace par défaut
    new Espace(0, '', '', 0, '', TypeEquipement.SON, '',0,0, []), 
    '' 
  );
  
  showModal: boolean = false;
  editMode: boolean = false;
  reservationCountByDate: any = {}; // Stocke le nombre de réservations par espace et par date
  chart: Chart | null = null; // Propriété pour stocker l'instance du graphique

  constructor(private reservationService: ReservationService, private espaceService: EspaceService) {}

  ngOnInit(): void {
    this.getReservations();
    this.getEspaces();
  }

  getReservations(): void {
    this.reservationService.getAllReservation().subscribe((data: Reservation[]) => {
      this.reservations = data;
      for (let reservation of this.reservations) {
        this.getEspaceNameById(reservation);
      }
      this.renderChart(); // Appel à la méthode pour rendre le graphique après avoir récupéré les données
    });
  }

  getEspaces(): void {
    this.espaceService.getAllEspaces().subscribe((data: Espace[]) => {
      this.espaces = data;
      console.log(data)
      this.renderChart(); // Appel à la méthode pour rendre le graphique après avoir récupéré les données
    });
  }

  getEspaceNameById(reservation: Reservation): void {
    this.espaceService.getEspaceById(reservation.espaceId).subscribe((espace: Espace) => {
      reservation.espacenName = espace.nom;
    });
  }

  showAddReservationModal(): void {
    this.selectedReservation = new Reservation(0, new Date(), new Date(), '', '', 0, '', '', 0, new Espace(0, '', '', 0, '', TypeEquipement.SON, '',0,0, []), '');
    this.editMode = false;
    this.showModal = true;
  }

  editReservation(reservation: Reservation): void {
    this.selectedReservation = { ...reservation };
    this.editMode = true;
    this.showModal = true;
  }

  submitForm(): void {
    if (this.editMode) {
      this.reservationService.updateReservation(this.selectedReservation.id, this.selectedReservation).subscribe(() => {
        this.getReservations();
        this.closeModal();
      });
    } else {
      this.reservationService.addReservation(this.selectedReservation).subscribe(() => {
        this.getReservations();
        this.closeModal();
      });
    }
  }

  deleteReservation(id: number): void {
    this.reservationService.deleteReservation(id).subscribe(() => {
      this.getReservations();
    });
  }

  calculateReservationCountByDate(date: string): void {
    this.reservationService.getReservationCountByDate(date).subscribe((data: any) => {
      this.reservationCountByDate = data;
    });
  }
  renderChart(): void {
    const labels = this.espaces.map(espace => espace.nom); // Utiliser les noms des espaces comme labels
    const reservationCounts = this.espaces.map(espace => {
      // Trouver le nombre de réservations pour chaque espace
      return this.reservations.filter(reservation => reservation.espaceId === espace.id).length;
    });

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
              label: 'Nombre de réservations',
              data: reservationCounts,
              backgroundColor: 'rgba(0, 123, 255, 0.2)', // Couleur de remplissage sous les barres
              borderColor: '#007BFF', // Couleur des barres
              borderWidth: 2,
            }
          ]
        },
        options: {
          responsive: true,
          // scales: {
          //   xAxes: {
          //     title: {
          //       display: true,
          //       text: 'Espaces'
          //     }
          //   },
          //   y: {
          //     beginAtZero: true,
          //     title: {
          //       display: true,
          //       text: 'Nombre de réservations'
          //     }
          //   }
          // }
        }
      });
    }
  }

  closeModal(): void {
    this.showModal = false;
  }
}
