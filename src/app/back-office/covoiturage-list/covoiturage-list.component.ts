import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Covoiturage } from '../../models/covoiturage.model';
import { CovoiturageService } from '../../services/covoiturage.service';

@Component({
  selector: 'app-covoiturage-list',
  templateUrl: './covoiturage-list.component.html',
  styleUrls: ['./covoiturage-list.component.css']
})
export class CovoiturageListComponent implements OnInit {
  covoiturages: Covoiturage[] = [];
  searchLieuDepart: string = '';
  searchDestination: string = '';
  searchDate: Date | null = null;
  searchFumeur: string = '';

  constructor(private covoiturageService: CovoiturageService, private router: Router) {}

  ngOnInit(): void {
    this.loadCovoiturages();
  }

  loadCovoiturages(): void {
    this.covoiturageService.getAllCovoiturages().subscribe(data => {
      this.covoiturages = data;
    });
  }

  editCovoiturage(id: number): void {
    this.router.navigate(['/back-office/edit-covoiturage', id]);
  }

  deleteCovoiturage(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce covoiturage ?')) {
      this.covoiturageService.deleteCovoiturage(id).subscribe(() => {
        console.log('Covoiturage supprimé avec succès !');
        this.loadCovoiturages();
      });
    }
  }

  searchCovoiturages(): void {
    const criteria = {
      fumeur: this.searchFumeur,
      dateDepart: this.searchDate,
      lieuDepart: this.searchLieuDepart,
      destination: this.searchDestination
    };

    this.covoiturageService.searchCovoiturages(criteria).subscribe(data => {
      this.covoiturages = data;
    });
  }
 
}
