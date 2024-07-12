
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Formation } from 'src/app/formation';
import { FormationService } from 'src/app/formation.service';
import { Participant } from 'src/app/participant';
import { ParticipantService } from 'src/app/participant.service';
@Component({
  selector: 'app-participer',
  templateUrl: './participer.component.html',
  styleUrls: ['./participer.component.css']
})
export class ParticiperComponent {

  nom: string = '';
  email: string = '';
  formationId: number | null = null;
  formations: Formation[] = [];
  // Propriétés pour la validation
  nomError: string = '';
  emailError: string = '';
  formationIdError: string = '';

  constructor(private participantService: ParticipantService, private router: Router,private formationService: FormationService) {}

  ngOnInit(): void {
    this.getAllFormations();
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
    // Vérifier la validité des champs avant de soumettre le formulaire
    if (!this.validateForm()) {
      return;
    }

    const newParticipant: Participant = {
      id: 0, // L'ID sera généré côté serveur lors de la création
      nom: this.nom,
      email: this.email,
      formationId: this.formationId!
    };

    this.participantService.createParticipant(newParticipant, this.formationId!).subscribe(
      () => {
        console.log('Participant ajouté avec succès.');
        this.router.navigate(['/back-office/participants']); // Rediriger vers la liste des participants après ajout
      },
      (error: any) => {
        console.log('Erreur lors de l\'ajout du participant:', error);
        // Gérer l'erreur ici, par exemple, afficher un message à l'utilisateur
      }
    );
  }

  validateForm(): boolean {
    let isValid = true;

    // Validation du champ 'nom'
    if (this.nom.trim() === '') {
      this.nomError = 'Le nom est requis.';
      isValid = false;
    } else {
      this.nomError = '';
    }

    // Validation du champ 'email'
    if (this.email.trim() === '') {
      this.emailError = 'L\'email est requis.';
      isValid = false;
    } else {
      this.emailError = '';
    }

    // Validation du champ 'formationId'
    if (this.formationId === null) {
      this.formationIdError = 'L\'ID de la formation est requis.';
      isValid = false;
    } else {
      this.formationIdError = '';
    }

    return isValid;
  }
}

