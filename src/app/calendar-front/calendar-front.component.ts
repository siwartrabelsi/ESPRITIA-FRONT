import { Component, OnInit } from '@angular/core';
import { Espace } from '../espace';
import { Reservation } from '../reservation';
import { CalendarOptions } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { EspaceService } from '../Espaces services/espace.service';
import { ReservationService } from '../Reservations services/reservation.service';

@Component({
  selector: 'app-calendar-front',
  templateUrl: './calendar-front.component.html',
  styleUrls: ['./calendar-front.component.css']
})
export class CalendarFrontComponent implements OnInit {
  espaces: Espace[] = [];
  reservations: Reservation[] = [];
  espacesDisponibles: Espace[] = []
  selectedDate: string = ''; 
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, interactionPlugin],
    dateClick: this.handleDateClick.bind(this), // bind is important!
    events: []
    
  };
   
  constructor(private espaceService: EspaceService, private reservationService: ReservationService) { }

  ngOnInit(): void {
    this.loadReservations();
    this.loadEspaces();
  }
  handleDateClick(arg: any) {
    // Handle date click event here
    console.log('date click! ' + arg.dateStr);
    this.filterEspacesByDate(arg.dateStr);
  }
  loadReservations(): void {
    this.reservationService.getAllReservation().subscribe((data: Reservation[]) => {
      this.reservations = data;
      this.populateCalendarWithReservations();
    });
  }

  loadEspaces(): void {
    this.espaceService.getAllEspaces().subscribe((data: Espace[]) => {
      this.espaces = data;
    });
  }

  populateCalendarWithReservations(): void {
    this.calendarOptions.events = this.reservations.map(reservation => ({
      title: reservation.espacenName,
      start: reservation.datedebut,
      end: reservation.datefin
    }));
    console.log("this.reservations", this.reservations[0]);
  }

  filterEspacesByDate(dateStr: string): void {
    const selectedDate = new Date(dateStr); // Convertir en objet Date
    const selectedDateStr = selectedDate.toISOString().split('T')[0]; // Convertir en chaîne au format YYYY-MM-DD
  
    this.espaceService.getAvailableSpaces(selectedDateStr).subscribe((data: Espace[]) => {
      this.espacesDisponibles = data;
      // Mettre à jour l'interface utilisateur pour afficher les espaces disponibles
      console.log('Espaces disponibles:', this.espacesDisponibles);
    });
  }
}


