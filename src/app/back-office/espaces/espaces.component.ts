import { Component, OnInit } from '@angular/core';



import { Router } from '@angular/router'; // Importer le Router pour la navigation
import { EspaceService } from '../../Espaces services/espace.service';
import { Espace } from '../../espace';
import { TypeEquipement } from '../../typeEquipement';
import * as L from 'leaflet';

@Component({
  selector: 'app-espaces',
  templateUrl: './espaces.component.html',
  styleUrls: ['./espaces.component.css']
})
export class EspacesComponent implements OnInit {
  map: L.Map | undefined;
  espaces: Espace[] = [];
  selectedEspace: Espace = new Espace(0, '', '', 0, '', TypeEquipement.SON, '',0,0, []);
  showModal: boolean = false;
  editMode: boolean = false;
  TypeEquipement = TypeEquipement; 
  selectedFile: File | null = null;
  searchTerm: string = ''; // Déclaration de searchTerm ici


  constructor(private espaceService: EspaceService , private router: Router) {}

  ngOnInit(): void {
    this.getEspaces();
  }

  getEspaces(): void {
    this.espaceService.getAllEspaces().subscribe((data: Espace[]) => {
      this.espaces = data;
      this.initializeMap();
    });
    
  }
  initializeMap(): void {
    this.map = L.map('map').setView([36.8065, 10.1815], 12); // Tunis coordinates

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    // Ajouter des marqueurs pour chaque espace
    this.espaces.forEach((espace: Espace) => {
      L.marker([espace.latitude, espace.longitude])
        .addTo(this.map!)
        .bindPopup(`<b>${espace.nom}</b><br>${espace.adresse}`);
    });
  }

  showAddEspaceModal(): void {
    this.selectedEspace = new Espace(0, '', '', 0, '', TypeEquipement.SON, '',0,0, []);
    this.editMode = false;
    this.showModal = true;
  }

  editEspace(espace: Espace): void {
    this.selectedEspace = { ...espace };
    this.editMode = true;
    this.showModal = true;
  }

  submitForm(): void {
   
    if (this.editMode) {
      if (this.selectedFile) {
        this.espaceService.updateEspace(this.selectedEspace.id, this.selectedEspace).subscribe(() => {
          this.uploadImage(this.selectedEspace.id);
        });
      } else {
        this.espaceService.updateEspace(this.selectedEspace.id, this.selectedEspace).subscribe(() => {
          this.getEspaces();
          this.closeModal();
        });
      }
    } else {
      this.espaceService.addEspace(this.selectedEspace).subscribe((newEspace) => {
        if (this.selectedFile) {
          this.uploadImage(newEspace.id);
        } else {
          this.getEspaces();
          this.closeModal();
        }
      });
    }
  }

  deleteEspace(id: number): void {
    this.espaceService.deleteEspace(id).subscribe(() => {
      this.getEspaces();
    });
  }

  closeModal(): void {
    this.showModal = false;
  }

 
    onFileSelected(event: any): void {
      const file: File = event.target.files[0];
      if (file) {
        this.selectedFile = file;
      }
    }
    uploadImage(id: number): void {
      if (!this.selectedFile) return;
  
      const formData: FormData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);
  
      this.espaceService.uploadImage(id, formData).subscribe(() => {
        this.getEspaces();
        this.closeModal();
      });
    }
     
   
      searchEspaces(): void {
        if (this.searchTerm) {
          this.espaceService.searchEspaces(this.searchTerm).subscribe(
            (data: Espace[]) => {
              this.espaces = data;
            },
            (error: any) => {
              console.error('Erreur lors de la recherche des espaces', error);
            }
          );
        } else {
          this.getEspaces(); // Recharge la liste complète si le champ de recherche est vide
        }
      }

}
