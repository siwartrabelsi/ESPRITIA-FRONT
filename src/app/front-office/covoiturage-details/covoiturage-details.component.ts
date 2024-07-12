import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CovoiturageService } from '../../services/covoiturage.service';
import { Covoiturage } from '../../models/covoiturage.model';

@Component({
  selector: 'app-covoiturage-details',
  templateUrl: './covoiturage-details.component.html',
  styleUrls: ['./covoiturage-details.component.css']
})
export class CovoiturageDetailsComponent implements OnInit {
  covoiturage: Covoiturage | undefined;

  constructor(
    private route: ActivatedRoute,
    private covoiturageService: CovoiturageService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getCovoiturageDetails(id);
  }

  getCovoiturageDetails(id: number): void {
    this.covoiturageService.getCovoiturageById(id).subscribe(
      (data: Covoiturage) => {
        this.covoiturage = data;
      },
      (error) => {
        console.error('Error fetching covoiturage details', error);
      }
    );
  }
}
