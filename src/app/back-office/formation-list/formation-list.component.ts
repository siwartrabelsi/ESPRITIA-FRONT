// formation-list.component.ts
import { Component, OnInit } from '@angular/core';
import { FormationService } from '../../formation.service';
import { Formation } from '../../formation';

@Component({
  selector: 'app-formation-list',
  templateUrl: './formation-list.component.html',
  styleUrls: ['./formation-list.component.css']
})
export class FormationListComponent implements OnInit {

  formations: Formation[]=[];

  constructor(private formationService: FormationService) { }

  ngOnInit(): void {
    this.loadFormations();
  }
  

  loadFormations() {
    this.formationService.getAllFormations().subscribe(
      formations => {
        this.formations = formations;
      },
      error => {
        console.log('Erreur lors du chargement des formations:', error);
      }
    );
  }

  deleteFormation(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) {
      this.formationService.deleteFormation(id).subscribe(
        () => {
          console.log('Formation supprimée avec succès.');
          this.loadFormations(); // Recharger la liste après suppression
        },
        error => {
          console.log('Erreur lors de la suppression de la formation:', error);
        }
      );
    }
  }
}
