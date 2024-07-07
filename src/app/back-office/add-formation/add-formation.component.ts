import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Formation } from 'src/app/formation';
import { FormationService } from 'src/app/formation.service';

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
  clubId: number = 0;

  constructor(private formationService: FormationService, private router: Router) {}

  ngOnInit(): void {
    // Initialisation si nécessaire
  }

  onSubmit() {
    const newFormation: Formation = {
      id: 0, // L'ID sera généré côté serveur lors de la création
      nom: this.nom,
      description: this.description,
      dateDebut: this.dateDebut,
      dateFin: this.dateFin,
      clubId: this.clubId,
      participant: [],
    };

    this.formationService.createFormation(newFormation, this.clubId).subscribe(
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
