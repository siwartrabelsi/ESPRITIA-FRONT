import { Reservation } from "./reservation";
import { TypeEquipement } from "./typeEquipement";



export class Espace {
    id: number;
    nom: string;
    description: string;
    capacite: number;
    adresse: string;
    equipement: TypeEquipement;
    photo: string;
    latitude!: number; // Ajoutez ces propriétés si elles ne sont pas déjà présentes
    longitude!: number;
    reservations: Reservation[];
    constructor(
      id: number,
      nom: string,
      description: string,
      capacite: number,
      adresse: string,
      equipement: TypeEquipement,
      photo: string,
      latitude: number, 
      longitude: number,
      reservations: Reservation[],
    
    ) {
      this.id = id;
      this.nom = nom;
      this.description = description;
      this.capacite = capacite;
      this.adresse = adresse;
      this.equipement = equipement;
      this.photo = photo;
      this.reservations = reservations;
    }
  }