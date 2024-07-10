export interface Covoiturage {
  id?: number;
  heureDepart: Date; // Assurez-vous que cela correspond à ce que vous utilisez dans Spring Boot
  lieuDepart: string;
  destination: string;
  nbPlace: number;
  status: string; // Ou utilisez un type Enum qui correspond à IStatutCovoiturage
  fumeur: string;
  user?: any; // Si nécessaire
}
