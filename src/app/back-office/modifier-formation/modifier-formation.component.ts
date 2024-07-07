import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Formation } from 'src/app/formation';
import { FormationService } from 'src/app/formation.service';

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

  formSubmitted: boolean = false;

  constructor(
    private formationService: FormationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID de la formation depuis l'URL
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.loadFormationDetails(+params['id']);
      }
    });
  }

  loadFormationDetails(id: number): void {
    // Appeler le service pour récupérer les détails de la formation par son ID
    this.formationService.getFormationById(id).subscribe(
      (formation: Formation) => {
        this.formation = formation;
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
           && !!this.formation.dateDebut && !!this.formation.dateFin && !!this.formation.clubId;
  }
}
