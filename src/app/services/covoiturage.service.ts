import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Covoiturage } from '../models/covoiturage.model';

@Injectable({
  providedIn: 'root'
})
export class CovoiturageService {

  private apiUrl = 'http://localhost:9090/api/covoiturages'; // Modifier l'URL en fonction de votre API

  constructor(private http: HttpClient) { }

  getCovoiturageById(id: number): Observable<Covoiturage> {
    return this.http.get<Covoiturage>(`${this.apiUrl}/${id}`);
  }

  getAllCovoiturages(): Observable<Covoiturage[]> {
    return this.http.get<Covoiturage[]>(this.apiUrl);
  }

  

  addCovoiturage(covoiturage: Covoiturage): Observable<Covoiturage> {
    return this.http.post<Covoiturage>(this.apiUrl, covoiturage);
  }

  updateCovoiturage(id: number, covoiturage: Covoiturage): Observable<Covoiturage> {
    return this.http.put<Covoiturage>(`${this.apiUrl}/${id}`, covoiturage);
  }

  deleteCovoiturage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  searchCovoiturages(criteria: any): Observable<Covoiturage[]> {
    let params = new HttpParams();

    if (criteria.fumeur) {
      params = params.set('fumeur', criteria.fumeur);
    }
    if (criteria.dateDepart) {
      // Convertir la date au format ISO8601 pour l'envoyer au backend
      params = params.set('dateDepart', criteria.dateDepart.toISOString());
    }
    if (criteria.lieuDepart) {
      params = params.set('lieuDepart', criteria.lieuDepart);
    }
    if (criteria.destination) {
      params = params.set('destination', criteria.destination);
    }

    return this.http.get<Covoiturage[]>(`${this.apiUrl}/search`, { params });
  }
  
}
