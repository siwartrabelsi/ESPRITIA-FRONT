import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Formation } from 'src/app/formation';
import { FormationService } from 'src/app/formation.service';
import { Club } from 'src/app/club'; // Importez le modèle Club
import { ClubService } from 'src/app/club.service'; // Importez le service ClubService

@Component({
  selector: 'app-add-formation',
  templateUrl: './add-formation.component.html',
  styleUrls: ['./add-formation.component.css']
})
export class AddFormationComponent implements OnInit {

  nom: string = '';
  description: string = '';
  dateDebut: Date = new Date();
  dateFin: Date = new Date();
  clubNom: string = ''; // Nom du club sélectionné
  clubs: Club[] = []; // Liste des clubs disponibles

  constructor(
    private formationService: FormationService,
    private router: Router,
    private clubService: ClubService // Injectez le service ClubService
  ) {}

  ngOnInit(): void {
    this.getAllClubs();
  }

  getAllClubs(): void {
    this.clubService.getClubs().subscribe(
      (data: Club[]) => {
        this.clubs = data;
      },
      (error) => {
        console.error('Error fetching clubs', error);
      }
    );
  }

  onSubmit() {
    // Trouver l'ID du club à partir du nom sélectionné
    const selectedClub = this.clubs.find(club => club.nom === this.clubNom);
    const newFormation: Formation = {
      id: 0, // L'ID sera généré côté serveur lors de la création
      nom: this.nom,
      description: this.description,
      dateDebut: this.dateDebut,
      dateFin: this.dateFin,
      clubId: selectedClub ? selectedClub.id : 0, // Utilisation de l'ID du club trouvé
      participant: []
    };

    this.formationService.createFormation(newFormation, selectedClub ? selectedClub.id : 0).subscribe(
      () => {
        console.log('Formation ajoutée avec succès.');
        this.router.navigate(['/back-office/formations']); // Rediriger vers la liste des formations après ajout
      },
      (error: any) => {
        console.log('Erreur lors de l\'ajout de la formation:', error);
        // Gérer l'erreur ici, par exemple, afficher un message à l'utilisateur
      }
    );
  }
}
