import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClubService } from '../../club.service';
import { Club } from '../../club';

@Component({
  selector: 'app-club-form',
  templateUrl: './club-form.component.html',
  styleUrls: ['./club-form.component.css']
})
export class ClubFormComponent {
  club: Club = {
    id: 0,
    nom: '',
    objectif: '',
    date: new Date(),
    members: [],
    evenements: [],
    nbLikes: 0,
    nbDislikes: 0,
    pointsFidelite: 0,
    latitude: 0,
    longitude: 0,
    formations: [],
    photo:''
  };
  selectedFile: File | null = null;
  constructor(private clubService: ClubService, private router: Router) {}
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  save(): void {
    this.clubService.createClub(this.club).subscribe(
      (createdClub) => {
        console.log('Club créé avec succès', createdClub);
        this.club = createdClub; // Mettre à jour l'objet club avec le club créé, y compris l'ID

        if (this.selectedFile) {
          const formData = new FormData();
          formData.append('file', this.selectedFile);

          this.clubService.uploadPhoto(this.club.id, formData).subscribe(
            (response) => {
              console.log('Réponse du serveur pour l\'upload de l\'image', response);
              // Mettre à jour l'URL de la photo du club après téléchargement
              if (response && response.photo) {
                this.club.photo = response.photo; // Assurez-vous que la structure de la réponse correspond à ce que vous attendez
              }
              this.router.navigate(['/back-office/clubs']); // Rediriger vers la liste des clubs après téléchargement de l'image
            },
            (error) => {
              console.error('Erreur lors de l\'upload de l\'image vers Cloudinary', error);
              // Gestion de l'erreur ici
              this.router.navigate(['/back-office/clubs']); // Rediriger vers la liste des clubs même en cas d'erreur
            }
          );
        } else {
          console.error('Aucun fichier sélectionné');
          this.router.navigate(['/back-office/clubs']); // Rediriger vers la liste des clubs si aucun fichier n'est sélectionné
        }
      },
      (error) => {
        console.error('Erreur lors de la création du club', error);
        // Gestion de l'erreur ici
      }
    );
  }
}