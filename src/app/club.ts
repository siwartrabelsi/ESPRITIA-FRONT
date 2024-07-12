import { Formation } from "./formation";

export interface Club {
  id: number;
  nom: string;
  objectif: string;
  date:Date;
  members: any[];
  evenements: any[];
  nbLikes: number;
  nbDislikes: number;
  pointsFidelite: number;
  latitude: number;
  longitude: number;
  formations:Formation[];
  photo: string;
}