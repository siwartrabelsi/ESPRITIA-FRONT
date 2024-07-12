import { Component, OnInit } from '@angular/core';
import { FormationService } from '../formation.service';
import { Formation } from '../formation';

@Component({
  selector: 'app-eventformation',
  templateUrl: './eventformation.component.html',
  styleUrls: ['./eventformation.component.css']
})
export class EventformationComponent {

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


}

