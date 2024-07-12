import { User } from "../back-office/users/Dto/User";

export interface Evenement {
    id: number;
    nom: string;
    date: Date;
    dateFin:Date;
    affiche:string;
    organisateur: User;
    statut: string;
    rating:number;
    espaces: any[];
    capacite : number;
    nbrParticipant : number;
    siteweb : string;
    clubs: any[];
    participants: any[];
    user:User;

  }
