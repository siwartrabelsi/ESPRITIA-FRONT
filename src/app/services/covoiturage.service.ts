import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  getCovoiturage(id: number): Observable<Covoiturage> {
    return this.http.get<Covoiturage>(`${this.apiUrl}/${id}`);
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
}
