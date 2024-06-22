import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EvenementService } from '../evenement.service';
import { Evenement } from '../Model/Evenement';



@Component({
  selector: 'app-evenement-detail',
  templateUrl: './evenement-detail.component.html',
  styleUrls: ['./evenement-detail.component.css']
})
export class EvenementDetailComponent {
  evenement: Evenement | undefined;

  constructor(
    private route: ActivatedRoute,
    private evenementService: EvenementService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.evenementService.getEvenement(id).subscribe(data => {
      this.evenement = data;
    });
  }

}
