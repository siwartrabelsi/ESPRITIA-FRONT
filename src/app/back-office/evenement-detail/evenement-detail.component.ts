import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Evenement } from 'src/app/Model/Evenement';
import { EvenementService } from 'src/app/evenement.service';



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
