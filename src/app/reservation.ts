import { Espace } from "./espace";

export class Reservation {
  id: number;
  datedebut: Date;
  datefin: Date;
  clubOrganisateur: string;
  typeEvenement: string;
  nombreParicipantsAttendus: number;
  heureDebut: string;
  heureFin: string;
  espaceId: number;
  espace: Espace ;
  nomEspace: string;

  constructor(
    id: number,
    datedebut: Date,
    datefin: Date,
    clubOrganisateur: string,
    typeEvenement: string,
    nombreParicipantsAttendus: number,
    heureDebut: string,
    heureFin: string,
    espaceId: number,
    espace: Espace ,
    nomEspace: string
  ) {
    this.id = id;
    this.datedebut = datedebut;
    this.datefin = datefin;
    this.clubOrganisateur = clubOrganisateur;
    this.typeEvenement = typeEvenement;
    this.nombreParicipantsAttendus = nombreParicipantsAttendus;
    this.heureDebut = heureDebut;
    this.heureFin = heureFin;
    this.espaceId = espaceId;
    this.espace = espace;
    this.nomEspace = nomEspace;
  }
}