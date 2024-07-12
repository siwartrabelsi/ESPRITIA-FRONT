import { Component, OnInit } from '@angular/core';
import { CovoiturageService } from '../../services/covoiturage.service';
import { Covoiturage } from '../../models/covoiturage.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-coiturage-front',
  templateUrl: './coiturage-front.component.html',
  styleUrls: ['./coiturage-front.component.css']
})
export class CoiturageFrontComponent implements OnInit {
  covoiturages: Covoiturage[] = [];
  searchFumeur: string = '';
  searchDate: string = '';
  searchLieuDepart: string = '';
  searchDestination: string = '';

  constructor(private covoiturageService: CovoiturageService, private router: Router , private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getCovoiturages();
  }

  getCovoiturages(): void {
    this.covoiturageService.getAllCovoiturages().subscribe(
      (data: Covoiturage[]) => {
        this.covoiturages = data;
      },
      (error) => {
        console.error('Error fetching covoiturages', error);
      }
    );
  }

  searchCovoiturages(): void {
    this.covoiturages = this.covoiturages.filter(covoiturage =>
      (this.searchFumeur === '' || covoiturage.fumeur === this.searchFumeur) &&
      (this.searchDate === '' || new Date(covoiturage.heureDepart).toDateString() === new Date(this.searchDate).toDateString()) &&
      (this.searchLieuDepart === '' || covoiturage.lieuDepart.includes(this.searchLieuDepart)) &&
      (this.searchDestination === '' || covoiturage.destination.includes(this.searchDestination))
    );
  }

  viewDetails(covoiturageId: number): void {
    this.router.navigate(['/details', covoiturageId]);
  }



  reservePlace(covoiturage: Covoiturage): void {
    if (covoiturage.nbPlace > 0) {
      // Utilisateur statique
      const user = {
        id: 10,
        email: 'hamrounij5@gmail.com'
      };

      covoiturage.nbPlace -= 1;

      // Mettre à jour le statut si plus de places disponibles
      if (covoiturage.nbPlace === 0) {
        covoiturage.status = 'non_disponible';
      }

      // Ajout d'un attribut statique 'user' à covoiturage si nécessaire
      (covoiturage as any).user = user;

      // Mettre à jour le covoiturage
      this.covoiturageService.updateCovoiturage(covoiturage.id!, covoiturage).subscribe(
        (response) => {
          this.toastr.success('Réservation réussie', 'Succès');
          
          // Envoyer un email avec les informations de l'utilisateur statique
          this.covoiturageService.sendReservationEmail(covoiturage).subscribe(
            (emailResponse) => {
              this.toastr.success('Email envoyé avec succès', 'Succès');
            },
            (emailError) => {
              this.toastr.error('Erreur lors de l\'envoi de l\'email', 'Erreur');
              console.error('Error sending email', emailError);
            }
          );
        },
        (error) => {
          this.toastr.error('Erreur lors de la réservation', 'Erreur');
          console.error('Error reserving place', error);
        }
      );
    } else {
      this.toastr.info('Pas de places disponibles', 'Information');
      console.log('No places available');
    }
  }

  
  
}




