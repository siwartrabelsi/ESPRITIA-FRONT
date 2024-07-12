import { Participant } from "./participant";

export interface Formation {
    id: number;
    nom: string;
    description: string;
    dateDebut: Date;
    dateFin: Date;
    clubId: number;
    participant:Participant[];
    
  }
  