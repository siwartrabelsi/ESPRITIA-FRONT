import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Covoiturage } from '../../models/covoiturage.model';
import { CovoiturageService } from '../../services/covoiturage.service';

@Component({
  selector: 'app-edit-covoiturage',
  templateUrl: './edit-covoiturage.component.html',
  styleUrls: ['./edit-covoiturage.component.css']
})
export class EditCovoiturageComponent implements OnInit {
  covoiturage: Covoiturage = {
    id: 0,
    heureDepart: new Date(),
    lieuDepart: '',
    destination: '',
    nbPlace: 0,
    status: 'disponible',
    fumeur: 'Non fumeur' // Valeur par défaut pour fumeur
  };

  statuses: string[] = ['disponible', 'annulé', 'non_disponible', 'reporté']; // Liste des statuts

  today: string = new Date().toISOString().substring(0, 10); // Propriété pour stocker la date d'aujourd'hui au format ISO

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private covoiturageService: CovoiturageService
  ) {}

  ngOnInit(): void {
    this.getAndSetCovoiturage();
  }

  // Méthode pour récupérer et initialiser les données du covoiturage à modifier
  private getAndSetCovoiturage(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.covoiturageService.getCovoiturageById(id).subscribe(
      covoiturage => {
        this.covoiturage = covoiturage;
      },
      error => {
        console.log('Erreur lors de la récupération du covoiturage : ', error);
      }
    );
  }

  // Méthode pour sauvegarder les modifications du covoiturage
  saveCovoiturage(): void {
    if (this.covoiturage.id !== undefined) { // Vérifie si l'ID est défini
      this.covoiturageService.updateCovoiturage(this.covoiturage.id, this.covoiturage).subscribe(() => {
        console.log('Covoiturage mis à jour avec succès !');
        this.router.navigate(['/covoiturages']); // Rediriger vers la liste des covoiturages après la mise à jour
      });
    }
  }

  // Méthode pour valider la date de départ
  isHeureDepartValid(): boolean {
    return new Date(this.covoiturage.heureDepart) >= new Date(this.today);
  }
}
