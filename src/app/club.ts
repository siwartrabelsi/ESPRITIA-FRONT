export interface Club {
  id: number;
  nom: string;
  description: string;
  members: any[];
  evenements: any[];
  nbLikes: number;
  nbDislikes: number;
}