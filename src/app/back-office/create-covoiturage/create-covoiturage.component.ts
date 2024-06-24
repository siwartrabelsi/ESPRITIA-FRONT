import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Covoiturage } from '../../models/covoiturage.model';
import { CovoiturageService } from '../../services/covoiturage.service';

@Component({
  selector: 'app-create-covoiturage',
  templateUrl: './create-covoiturage.component.html',
  styleUrls: ['./create-covoiturage.component.css']
})
export class CreateCovoiturageComponent implements OnInit {
  covoiturage: Covoiturage = {
    heureDepart: new Date(),
    lieuDepart: '',
    destination: '',
    nbPlace: 0,
    status: 'disponible'
  };

  statuses: string[] = ['disponible', 'annulé', 'non_disponible', 'reporté'];
  showErrorMessage = false;

  constructor(private covoiturageService: CovoiturageService, private router: Router) {}

  ngOnInit(): void {}

  saveCovoiturage(): void {
    if (this.isDateInvalid()) {
      this.showErrorMessage = true;
      return;
    }
    this.covoiturageService.addCovoiturage(this.covoiturage).subscribe(() => {
      console.log('Nouveau covoiturage créé avec succès !');
      this.router.navigate(['/covoiturages']);
    });
  }

  isDateInvalid(): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Réinitialise l'heure actuelle à minuit pour une comparaison précise
    const selectedDate = new Date(this.covoiturage.heureDepart);
    return selectedDate < today;
  }
}
