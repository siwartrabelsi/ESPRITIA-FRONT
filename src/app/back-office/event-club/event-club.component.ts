import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Club } from 'src/app/club';
import { ClubService } from 'src/app/club.service';
import { EvenementService } from 'src/app/evenement.service';
import { Evenement } from 'src/app/Model/Evenement';

@Component({
  selector: 'app-event-club',
  templateUrl: './event-club.component.html',
  styleUrls: ['./event-club.component.css'],
})
export class EventClubComponent {
  evenements: Evenement[] = [];
  clubs: Club[] = [];
  selectedEvenementId!: number;
  selectedClubId!: number;

  constructor(
    private evenementService: EvenementService,
    private clubService: ClubService,
    private toastr: ToastrService // Assurez-vous de bien injecter ToastrService ici
  ) {}

  ngOnInit(): void {
    this.evenementService.getEvenements().subscribe(
      (data) => {
        this.evenements = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des événements:', error);
      }
    );

    this.clubService.getClubs().subscribe(
      (data) => {
        this.clubs = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des clubs:', error);
      }
    );
  }

  affecterEvenement() {
    this.evenementService
      .affecterEvenement(this.selectedEvenementId, this.selectedClubId)
      .subscribe(
        (response) => {
          console.log('Réponse du serveur:', response);
          this.toastr.success('Affectation réussie!', 'Succès');
        },
        (error) => {
          console.error("Erreur lors de l'affectation:", error);
          this.toastr.error("Erreur lors de l'affectation", 'Erreur');
        }
      );
  }
}
