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
  searchId: number | undefined;

  constructor(private covoiturageService: CovoiturageService, private router: Router) { }

  ngOnInit(): void {
    this.loadCovoiturages();
  }

  loadCovoiturages(): void {
    this.covoiturageService.getAllCovoiturages().subscribe(data => {
      this.covoiturages = data;
    });
  }

  editCovoiturage(id: number): void {
    this.router.navigate(['/edit', id]);
  }

  deleteCovoiturage(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce covoiturage ?')) {
      this.covoiturageService.deleteCovoiturage(id).subscribe(() => {
        console.log('Covoiturage supprimé avec succès !');
        this.loadCovoiturages();
      });
    }
  }

  searchCovoiturage(): void {
    if (this.searchId !== undefined) {
      this.covoiturageService.getCovoiturageById(this.searchId).subscribe(data => {
        this.covoiturages = [data]; // Mettre le résultat de la recherche dans un tableau pour l'affichage
      });
    }
  }
}
