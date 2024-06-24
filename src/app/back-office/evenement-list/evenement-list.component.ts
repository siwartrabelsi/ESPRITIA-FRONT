import { Router } from '@angular/router';
// src/app/evenement-list/evenement-list.component.ts
import { Component, OnInit } from '@angular/core';
import { EvenementService } from 'src/app/evenement.service';
import { Evenement } from '../../Model/Evenement';
import * as QRCode from 'qrcode';
@Component({
  selector: 'app-evenement-list',
  templateUrl: './evenement-list.component.html',
  styleUrls: ['./evenement-list.component.css']
})
export class EvenementListComponent implements OnInit {
  evenements: Evenement[] = [];
  qrCodeUrls: { [id: number]: string } = {};
  searchTerm: string = '';
  constructor(private evenementService: EvenementService , private Router : Router
  ) { }

  ngOnInit(): void {
    this.evenementService.getEvenements().subscribe(data => {
      this.evenements = data;
    });
    this.getProjectsAndGenerateQRCode();
  }

  updateEvenement(id: number): void {
   this.Router.navigate(['/updateEvenement', id])
    };
    DetailEvenement(id: number): void {
      this.Router.navigate(['/detailEvenement', id])
       };
  deleteEvenement(id: number): void {
    this.evenementService.deleteEvenement(id).subscribe(() => {
      this.evenements = this.evenements.filter(e => e.id !== id);
    });
  }
  async getProjectsAndGenerateQRCode(): Promise<void> {
    try {
      const evenements = await this.evenementService.getEvenements().toPromise();
      if (evenements) {
        this.evenements = evenements;
        await this.generateQRCodeForEvenements();
      } else {
        console.error('No projects found');
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  }
  async generateQRCodeForEvenements(): Promise<void> {
    for (const ev of this.evenements) {
      const detailsEv = {
        id: ev.id,
        name: ev.nom,
        date : ev.date,
        statut: ev.statut,
        rating:ev.rating
      };

      try {
        const url = await QRCode.toDataURL(JSON.stringify(detailsEv));
        this.qrCodeUrls[ev.id] = url;
      } catch (err) {
        console.error('Erreur lors de la génération du QR Code pour l evenement', ev.id, ':', err);
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
}
