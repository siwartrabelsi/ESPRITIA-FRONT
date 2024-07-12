// import { Component, OnInit } from '@angular/core';
// import { Evenement } from 'src/app/Model/Evenement';
// import { EvenementService } from 'src/app/evenement.service';

// @Component({
//   selector: 'app-participer-event-user',
//   templateUrl: './participer-event-user.component.html',
//   styleUrls: ['./participer-event-user.component.css'],
// })
// export class ParticiperEventUserComponent implements OnInit {
//   evenements: Evenement[] = [];
//   selectedEvenementId!: number;
//   userId: number | undefined;

//   constructor(private evenementService: EvenementService) {
//     const userIdString = localStorage.getItem('id');
//     if (userIdString) {
//       this.userId = parseInt(userIdString, 10); // Convertit la chaîne en nombre
//     }
//   }

//   ngOnInit(): void {
//     this.loadEvenements();
//   }

//   loadEvenements(): void {
//     this.evenementService.getEvenements().subscribe((data) => {
//       this.evenements = data;
//     });
//   }

//   participerEvenement(id: number): void {
//     if (this.userId) {
//       this.evenementService.participerEvenementF(id, this.userId).subscribe(
//         (response: any) => {
//           alert('Participation réussie !');
//           const evenementIndex = this.evenements.findIndex(ev => ev.id === id);
//           if (evenementIndex !== -1) {
//             this.evenements[evenementIndex].nbrParticipant--;
//           }
//         },
//         (error) => {
//           if (error.status === 409) {
//             alert('Vous avez déjà participé à cet événement.');
//           } else {
//             console.error('participation reussit!');
//             alert('Participation réussie !');
//           }
//         }
//       );
//     } else {
//       alert('Veuillez vous connecter pour participer à un événement.'); // Message si l'utilisateur n'est pas connecté
//     }
//   }
// }
import { Component, OnInit } from '@angular/core';
import { Evenement } from 'src/app/Model/Evenement';
import { EvenementService } from 'src/app/evenement.service';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-participer-event-user',
  templateUrl: './participer-event-user.component.html',
  styleUrls: ['./participer-event-user.component.css'],
})
export class ParticiperEventUserComponent implements OnInit {
  evenements: Evenement[] = [];
  qrCodeUrls: { [id: number]: string } = {};
  userId: number | undefined;

  constructor(private evenementService: EvenementService) {
    const userIdString = localStorage.getItem('id');
    if (userIdString) {
      this.userId = parseInt(userIdString, 10); // Convertit la chaîne en nombre
    }
  }

  ngOnInit(): void {
    this.loadEvenements();
  }

  loadEvenements(): void {
    this.evenementService.getEvenements().subscribe((data) => {
      this.evenements = data;
      this.generateQRCodeForEvenements(); // Call QR code generation after loading events
    });
  }

  async generateQRCodeForEvenements(): Promise<void> {
    for (const ev of this.evenements) {
      const url = ev.siteweb; // Utiliser l'URL du site web de l'événement

      try {
        const qrCodeUrl = await QRCode.toDataURL(url);
        this.qrCodeUrls[ev.id] = qrCodeUrl;
      } catch (err) {
        console.error(
          "Erreur lors de la génération du QR Code pour l'événement",
          ev.id,
          ':',
          err
        );
      }
    }
  }

  participerEvenement(id: number): void {
    if (this.userId) {
      this.evenementService.participerEvenementF(id, this.userId).subscribe(
        (response: any) => {
          alert('Participation réussie !');
          const evenementIndex = this.evenements.findIndex(
            (ev) => ev.id === id
          );
          if (evenementIndex !== -1) {
            this.evenements[evenementIndex].nbrParticipant--;
          }
        },
        (error) => {
          if (error.status === 409) {
            alert('Vous avez déjà participé à cet événement.');
          } else {
            console.error('participation reussit!');
            alert('Participation réussie !');
          }
        }
      );
    } else {
      alert('Veuillez vous connecter pour participer à un événement.'); // Message si l'utilisateur n'est pas connecté
    }
  }
}
