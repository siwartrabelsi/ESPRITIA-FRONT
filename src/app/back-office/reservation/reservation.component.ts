import { Component } from '@angular/core';
import { Reservation } from '../../reservation';
import { Espace } from '../../espace';
import { TypeEquipement } from '../../typeEquipement';
import { ReservationService } from '../../Reservations services/reservation.service';
import { EspaceService } from '../../Espaces services/espace.service';


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent {
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
    new Espace(0, '', '', 0, '', TypeEquipement.SON, '', []), 
    '' 
  );
  
  showModal: boolean = false;
  editMode: boolean = false;

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
    });
  }

  getEspaces(): void {
    this.espaceService.getAllEspaces().subscribe((data: Espace[]) => {
      this.espaces = data;
      console.log(data)
    });
  }

  getEspaceNameById(reservation: Reservation): void {
    this.espaceService.getEspaceById(reservation.espaceId).subscribe((espace: Espace) => {
      reservation.nomEspace = espace.nom;
    });
  }

  showAddReservationModal(): void {
    this.selectedReservation = new Reservation(0, new Date(), new Date(), '', '', 0, '', '', 0, new Espace(0, '', '', 0, '', TypeEquipement.SON, '', []), '');
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

  closeModal(): void {
    this.showModal = false;
  }
}
