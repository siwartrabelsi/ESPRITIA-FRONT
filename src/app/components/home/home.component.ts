import { Component, OnInit } from '@angular/core';
import { CovoiturageService } from '../../services/covoiturage.service';
import { Covoiturage } from '../../models/covoiturage.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  covoiturages: Covoiturage[] = [];
  searchId: number | undefined;

  constructor(private covoiturageService: CovoiturageService) { }

  ngOnInit(): void {
    this.getCovoiturages();
  }

  getCovoiturages(): void {
    this.covoiturageService.getAllCovoiturages().subscribe(covoiturages => this.covoiturages = covoiturages);
  }

  searchCovoiturage(): void {
    if (this.searchId) {
      this.covoiturageService.getCovoiturageById(this.searchId).subscribe(covoiturage => {
        this.covoiturages = covoiturage ? [covoiturage] : [];
      });
    } else {
      this.getCovoiturages();
    }
  }

  deleteCovoiturage(id: number): void {
    this.covoiturageService.deleteCovoiturage(id).subscribe(() => this.getCovoiturages());
  }
}
