// import { Router } from '@angular/router';
// import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { EvenementService } from 'src/app/evenement.service';
// import * as QRCode from 'qrcode';
// import { Evenement } from 'src/app/Model/Evenement';
// import { Chart, registerables } from 'chart.js';

// @Component({
//   selector: 'app-evenement-list',
//   templateUrl: './evenement-list.component.html',
//   styleUrls: ['./evenement-list.component.css'],
// })
// export class EvenementListComponent implements OnInit {
//   evenements: Evenement[] = [];
//   qrCodeUrls: { [id: number]: string } = {};
//   searchTerm: string = '';

//   chart: any;
//   @ViewChild('myChart') myChart!: ElementRef;

//   constructor(
//     private evenementService: EvenementService,
//     private router: Router
//   ) {
//     Chart.register(...registerables);  // Register all necessary components
//   }

//   ngOnInit(): void {
//     this.evenementService.getEvenements().subscribe((data) => {
//       this.evenements = data;
//       this.generateQRCodeForEvenements(); // Call QR code generation after loading events

//       const labels = this.evenements.map((evenement: any) => evenement.nom);
//       const ratings = this.evenements.map((evenement: any) => evenement.capacite);

//       this.createChart(labels, ratings);
//     });
//   }

//   updateEvenement(id: number): void {
//     this.router.navigate(['/back-office/updateEvenement', id]);
//   }

//   DetailEvenement(id: number): void {
//     this.router.navigate(['/back-office/detailEvenement', id]);
//   }

//   deleteEvenement(id: number): void {
//     this.evenementService.deleteEvenement(id).subscribe(() => {
//       this.evenements = this.evenements.filter((e) => e.id !== id);
//     });
//   }

//   async generateQRCodeForEvenements(): Promise<void> {
//     for (const ev of this.evenements) {
//       const url = `${window.location.origin}/back-office/detailEvenement/${ev.id}`;

//       try {
//         const qrCodeUrl = await QRCode.toDataURL(url);
//         this.qrCodeUrls[ev.id] = qrCodeUrl;
//       } catch (err) {
//         console.error(
//           'Erreur lors de la génération du QR Code pour l evenement',
//           ev.id,
//           ':',
//           err
//         );
//       }
//     }
//   }

//   get filteEvenements() {
//     return this.evenements.filter(
//       (ev: Evenement) =>
//         ev.id.toString().includes(this.searchTerm) ||
//         ev.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
//         ev.date.toString().includes(this.searchTerm) ||
//         ev.statut.toLowerCase().includes(this.searchTerm.toLowerCase())
//     );
//   }

//   createChart(labels: string[], data: number[]) {
//     const ctx = this.myChart.nativeElement.getContext('2d');
//     const myChart = new Chart(ctx, {
//       type: 'bar',
//       data: {
//         labels: labels,
//         datasets: [{
//           label: 'capacité',
//           data: data,
//           backgroundColor: 'rgba(75, 192, 192, 0.2)',
//           borderColor: 'rgba(75, 192, 192, 1)',
//           borderWidth: 0.5,
//         }],
//       },
//       options: {
//         scales: {
//           y: {
//             type: 'linear',
//             position: 'left',
//             beginAtZero: true,
//           },
//         },
//       },
//     });
//   }
// }
import { Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EvenementService } from 'src/app/evenement.service';
import * as QRCode from 'qrcode';
import { Evenement } from 'src/app/Model/Evenement';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-evenement-list',
  templateUrl: './evenement-list.component.html',
  styleUrls: ['./evenement-list.component.css'],
})
export class EvenementListComponent implements OnInit {
  evenements: Evenement[] = [];
  qrCodeUrls: { [id: number]: string } = {};
  searchTerm: string = '';

  chart: any;
  @ViewChild('myChart') myChart!: ElementRef;

  constructor(
    private evenementService: EvenementService,
    private router: Router
  ) {
    Chart.register(...registerables);  // Register all necessary components
  }

  ngOnInit(): void {
    this.evenementService.getEvenements().subscribe((data) => {
      this.evenements = data;
      this.generateQRCodeForEvenements(); // Call QR code generation after loading events

      const labels = this.evenements.map((evenement: any) => evenement.nom);
      const ratings = this.evenements.map((evenement: any) => evenement.capacite);

      this.createChart(labels, ratings);
    });
  }

  updateEvenement(id: number): void {
    this.router.navigate(['/back-office/updateEvenement', id]);
  }

  DetailEvenement(id: number): void {
    this.router.navigate(['/back-office/detailEvenement', id]);
  }

  deleteEvenement(id: number): void {
    this.evenementService.deleteEvenement(id).subscribe(() => {
      this.evenements = this.evenements.filter((e) => e.id !== id);
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
          'Erreur lors de la génération du QR Code pour l evenement',
          ev.id,
          ':',
          err
        );
      }
    }
  }

  get filteEvenements() {
    return this.evenements.filter(
      (ev: Evenement) =>
        ev.id.toString().includes(this.searchTerm) ||
        ev.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        ev.date.toString().includes(this.searchTerm) ||
        ev.statut.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  createChart(labels: string[], data: number[]) {
    const ctx = this.myChart.nativeElement.getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'capacité',
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 0.5,
        }],
      },
      options: {
        scales: {
          y: {
            type: 'linear',
            position: 'left',
            beginAtZero: true,
          },
        },
      },
    });
  }
}

