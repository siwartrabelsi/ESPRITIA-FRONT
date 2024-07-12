import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Participant } from 'src/app/participant';
import { ParticipantService } from 'src/app/participant.service';
import { Formation } from 'src/app/formation';
import { FormationService } from 'src/app/formation.service';

@Component({
  selector: 'app-update-participant',
  templateUrl: './update-participant.component.html',
  styleUrls: ['./update-participant.component.css']
})
export class UpdateParticipantComponent implements OnInit {
  participant: Participant = {
    id: 0,
    nom: '',
    email: '',
    formationId: 0
  };
  formations: Formation[] = [];
  formationNom: string = '';
  formSubmitted: boolean = false;

  constructor(
    private participantService: ParticipantService,
    private formationService: FormationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Récupérer l'ID du participant depuis l'URL
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.participant.id = +params['id'];
      }
    });
  }

  ngOnInit() {
    // Charger les détails du participant et les formations disponibles
    this.loadParticipantDetails();
    this.getAllFormations();
  }

  loadParticipantDetails() {
    // Appeler le service pour récupérer les détails du participant par son ID
    this.participantService.getParticipantById(this.participant.id).subscribe(
      (participant: Participant) => {
        this.participant = participant;
        // Trouver le nom de la formation associée
        this.formationService.getFormationById(participant.formationId).subscribe(
          (formation: Formation) => {
            this.formationNom = formation.nom;
          }
        );
      },
      (error: any) => {
        console.error('Erreur lors du chargement des détails du participant:', error);
        // Gérer l'erreur ici
      }
    );
  }

  getAllFormations(): void {
    this.formationService.getAllFormations().subscribe(
      (data: Formation[]) => {
        this.formations = data;
      },
      (error) => {
        console.error('Error fetching formations', error);
      }
    );
  }

  onSubmit() {
    this.formSubmitted = true;
    
    // Vérifier si le formulaire est valide
    if (!this.isFormValid()) {
      return;
    }

    // Trouver l'ID de la formation à partir du nom sélectionné
    const selectedFormation = this.formations.find(formation => formation.nom === this.formationNom);
    this.participant.formationId = selectedFormation ? selectedFormation.id : 0;

    // Appeler le service pour mettre à jour le participant
    this.participantService.updateParticipant(this.participant.id, this.participant).subscribe(
      () => {
        console.log('Participant mis à jour avec succès.');
        this.router.navigate(['/back-office/participants']);
      },
      (error: any) => {
        console.error('Erreur lors de la mise à jour du participant:', error);
        // Gérer l'erreur ici
      }
    );
  }

  isFormValid(): boolean {
    return !!this.participant.nom && !!this.participant.email && !!this.formationNom;
  }
}
