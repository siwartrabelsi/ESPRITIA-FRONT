import { Component, OnInit } from '@angular/core';
import { CovoiturageService } from '../../services/covoiturage.service';
import { Covoiturage } from '../../models/covoiturage.model';

@Component({
  selector: 'app-covoiturage',
  templateUrl: './covoiturage.component.html',
  styleUrls: ['./covoiturage.component.css']
})
export class CovoiturageComponent implements OnInit {
  covoiturages: Covoiturage[] = [];
  filteredCovoiturages: Covoiturage[] = [];
  lieuDepart: string = '';
  destination: string = '';
  nbPlaces: number = 1;

  constructor(private covoiturageService: CovoiturageService) { }

  ngOnInit(): void {
    this.getCovoiturages();
  }

  getCovoiturages(): void {
    this.covoiturageService.getAllCovoiturages().subscribe(
      (data: Covoiturage[]) => {
        this.covoiturages = data;
        this.filteredCovoiturages = data;
      },
      (error) => {
        console.error('Error fetching covoiturages', error);
      }
    );
  }

  filterCovoiturages(): void {
    this.filteredCovoiturages = this.covoiturages.filter(covoiturage =>
      covoiturage.lieuDepart.includes(this.lieuDepart) &&
      covoiturage.destination.includes(this.destination)
    );
  }

  reserveCovoiturage(covoiturage: Covoiturage): void {
    if (covoiturage.nbPlace >= this.nbPlaces) {
      covoiturage.nbPlace -= this.nbPlaces;
      if (covoiturage.id !== undefined) {
        this.covoiturageService.updateCovoiturage(covoiturage.id, covoiturage).subscribe(
          (response) => {
            console.log('Covoiturage updated successfully', response);
            alert('Réservation effectuée avec succès');
          },
          (error) => {
            console.error('Error updating covoiturage', error);
          }
        );
      } else {
        console.error('Covoiturage id is undefined');
      }
    } else {
      alert('Nombre de places insuffisant');
    }
  }
}
