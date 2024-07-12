import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Formation } from 'src/app/formation';
import { FormationService } from 'src/app/formation.service';
import { Club } from 'src/app/club'; // Importez le modèle Club
import { ClubService } from 'src/app/club.service'; // Importez le service ClubService

@Component({
  selector: 'app-modifier-formation',
  templateUrl: './modifier-formation.component.html',
  styleUrls: ['./modifier-formation.component.css']
})
export class ModifierFormationComponent implements OnInit {
  formation: Formation = {
    id: 0,
    nom: '',
    description: '',
    dateDebut: new Date(),
    dateFin: new Date(),
    clubId: 0,
    participant: []  // Initialisez selon vos besoins
  };
  clubs: Club[] = []; // Liste des clubs disponibles
  clubNom: string = ''; // Nom du club sélectionné
  formSubmitted: boolean = false;

  constructor(
    private formationService: FormationService,
    private router: Router,
    private route: ActivatedRoute,
    private clubService: ClubService // Injectez le service ClubService
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID de la formation depuis l'URL
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.loadFormationDetails(+params['id']);
      }
    });
    this.getAllClubs();
  }

  getAllClubs(): void {
    this.clubService.getClubs().subscribe(
      (data: Club[]) => {
        this.clubs = data;
        // Trouver le nom du club associé à la formation actuelle
        const selectedClub = this.clubs.find(club => club.id === this.formation.clubId);
        if (selectedClub) {
          this.clubNom = selectedClub.nom;
        }
      },
      (error) => {
        console.error('Error fetching clubs', error);
      }
    );
  }

  loadFormationDetails(id: number): void {
    // Appeler le service pour récupérer les détails de la formation par son ID
    this.formationService.getFormationById(id).subscribe(
      (formation: Formation) => {
        this.formation = formation;
        // Trouver le nom du club associé à la formation
        const selectedClub = this.clubs.find(club => club.id === this.formation.clubId);
        if (selectedClub) {
          this.clubNom = selectedClub.nom;
        }
      },
      (error: any) => {
        console.error('Erreur lors du chargement des détails de la formation:', error);
        // Gérer l'erreur ici si nécessaire
      }
    );
  }

  onSubmit(): void {
    this.formSubmitted = true;

    // Vérifier si le formulaire est valide
    if (!this.isFormValid()) {
      return;
    }

    // Trouver l'ID du club à partir du nom sélectionné
    const selectedClub = this.clubs.find(club => club.nom === this.clubNom);
    if (selectedClub) {
      this.formation.clubId = selectedClub.id;
    } else {
      console.error('Erreur: Club sélectionné introuvable.');
      return;
    }

    // Appeler le service pour mettre à jour la formation
    this.formationService.updateFormation(this.formation.id, this.formation).subscribe(
      () => {
        console.log('Formation mise à jour avec succès.');
        this.router.navigate(['/back-office/formations']);
      },
      (error: any) => {
        console.error('Erreur lors de la mise à jour de la formation:', error);
        // Gérer l'erreur ici si nécessaire
      }
    );
  }

  isFormValid(): boolean {
    return !!this.formation.nom && !!this.formation.description 
           && !!this.formation.dateDebut && !!this.formation.dateFin && !!this.clubNom;
  }
}
