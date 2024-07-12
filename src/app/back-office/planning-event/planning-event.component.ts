import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Evenement } from 'src/app/Model/Evenement';
import { EvenementService } from 'src/app/evenement.service';

@Component({
  selector: 'app-planning-event',
  templateUrl: './planning-event.component.html',
  styleUrls: ['./planning-event.component.css'],
})
export class PlanningEventComponent implements OnInit {
  evenements: Evenement[] = [];
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    events: [], // Les événements seront ajoutés dynamiquement
    eventClick: this.handleEventClick.bind(this),
  };

  constructor(
    private evenementService: EvenementService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEvenements();
  }

  loadEvenements(): void {
    this.evenementService.getEvenements().subscribe((data) => {
      this.evenements = data;
      this.updateCalendarEvents();
    });
  }

  updateCalendarEvents(): void {
    this.calendarOptions.events = this.evenements.map((ev) => ({
      title: ev.nom,
      start: ev.date, // Utilisation de la propriété date
      end: ev.dateFin, // Utilisation de la propriété dateFin
      url: `/back-office/detailEvenement/${ev.id}`,
    }));
  }

  handleEventClick(info: any): void {
    info.jsEvent.preventDefault();
    if (info.event.url) {
      this.router.navigateByUrl(info.event.url);
    }
  }
}
