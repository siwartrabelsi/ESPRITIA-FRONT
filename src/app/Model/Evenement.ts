export interface Evenement {
    id: number;
    nom: string;
    date: Date;
    affiche:string;
    organisateur: string;
    statut: string;
    rating:number;
    espaces: any[];
    clubs: any[];
  }
