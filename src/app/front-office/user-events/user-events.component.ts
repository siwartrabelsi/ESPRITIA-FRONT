import { Component } from '@angular/core';
import { Evenement } from 'src/app/Model/Evenement';
import { EvenementService } from 'src/app/evenement.service';

@Component({
  selector: 'app-user-events',
  templateUrl: './user-events.component.html',
  styleUrls: ['./user-events.component.css'],
})
export class UserEventsComponent {

  evenements: Evenement[] = [];
  userId: number | null = null;

  constructor(private evenementService: EvenementService) { }

  ngOnInit(): void {
    const storedUserId = localStorage.getItem('id');
    if (storedUserId) {
      this.userId = +storedUserId; 
      this.loadEvenements();
    } else {
      console.error('Utilisateur non connecté ou non trouvé dans le localStorage');
    }
  }

  loadEvenements(): void {
    if (this.userId !== null) {
      this.evenementService.getEvenementsByUserId(this.userId).subscribe(
        data => this.evenements = data,
        error => console.error(error)
      );
    }
  }

}
