import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Participant } from 'src/app/participant';
import { ParticipantService } from 'src/app/participant.service';

@Component({
  selector: 'app-update-participant',
  templateUrl: './update-participant.component.html',
  styleUrls: ['./update-participant.component.css']
})
export class UpdateParticipantComponent {
  participant: Participant = {
    id: 0,
    nom: '',
    email: '',
    formationId: 0
  };

  formSubmitted: boolean = false;

  constructor(
    private participantService: ParticipantService,
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
    // Charger les détails du participant lors de l'initialisation du composant
    this.loadParticipantDetails();
  }

  loadParticipantDetails() {
    // Appeler le service pour récupérer les détails du participant par son ID
    this.participantService.getParticipantById(this.participant.id).subscribe(
      (participant: Participant) => {
        this.participant = participant;
      },
      (error: any) => {
        console.error('Erreur lors du chargement des détails du participant:', error);
        // Gérer l'erreur ici
      }
    );
  }

  onSubmit() {
    this.formSubmitted = true;
    
    // Vérifier si le formulaire est valide
    if (!this.isFormValid()) {
      return;
    }

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
    return !!this.participant.nom && !!this.participant.email && !!this.participant.formationId;
  }
}
