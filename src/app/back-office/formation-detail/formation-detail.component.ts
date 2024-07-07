import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Formation } from 'src/app/formation';
import { FormationService } from 'src/app/formation.service';

@Component({
  selector: 'app-formation-detail',
  templateUrl: './formation-detail.component.html',
  styleUrls: ['./formation-detail.component.css']
})
export class FormationDetailComponent implements OnInit {

  formation: Formation | undefined;

  constructor(private route: ActivatedRoute, private formationService: FormationService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== null) { // Vérifiez si id n'est pas null avant de convertir en nombre
        const formationId = +id;
        if (!isNaN(formationId)) { // Vérifiez si la conversion en nombre est valide
          this.formationService.getFormationById(formationId).subscribe(
            (formation: Formation) => {
              this.formation = formation;
            },
            (error: any) => {
              console.error('Erreur lors de la récupération des détails de la formation:', error);
              // Gérer l'erreur ici
            }
          );
        } else {
          console.error('L\'ID de formation n\'est pas un nombre valide:', id);
          // Gérer l'erreur ici si nécessaire
        }
      } else {
        console.error('L\'ID de formation est null.');
        // Gérer l'erreur ici si nécessaire
      }
    });
  }

}
