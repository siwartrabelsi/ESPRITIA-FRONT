import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Router } from '@angular/router';
import { FormationService } from '../formation.service';
import { Formation } from '../formation';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements AfterViewInit {

  @ViewChild('calendar') calendarComponent!: ElementRef;

  constructor(
    private formationService: FormationService,
    private router: Router
  ) {}

  ngAfterViewInit() {
    this.fetchFormations();
  }

  fetchFormations() {
    this.formationService.getAllFormations().subscribe(
      (formations: Formation[]) => {
        const calendar = new Calendar(this.calendarComponent.nativeElement, {
          plugins: [dayGridPlugin, interactionPlugin],
          initialView: 'dayGridMonth',
          events: formations.map(formation => ({
            title: formation.nom,
            start: formation.dateDebut,
            end: formation.dateFin,
            id: formation.id.toString() // Convertir l'ID en chaîne de caractères
          })),
          eventClick: this.handleEventClick.bind(this)
        });
        calendar.render();
      },
      error => {
        console.error('Erreur lors de la récupération des formations : ', error);
      }
    );
  }

  handleEventClick(info: any) {
    this.router.navigate(['/participer', info.event.id]);
  }
}
