import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Formation } from './formation'; // Assurez-vous d'avoir un modèle pour Formation
import { Club } from './club';

@Injectable({
  providedIn: 'root'
})
export class FormationService {
  
  private apiUrl = 'http://localhost:9090/api/formations'; // L'URL de votre API Spring Boot

  constructor(private http: HttpClient) { }

  getAllFormations(): Observable<Formation[]> {
    return this.http.get<Formation[]>(this.apiUrl);
  }

  getFormationById(id: number): Observable<Formation> {
    return this.http.get<Formation>(`${this.apiUrl}/${id}`);
  }

  createFormation(formation: Formation, clubId: number): Observable<Formation> {
    return this.http.post<Formation>(`${this.apiUrl}/${clubId}`, formation);
  }

  updateFormation(id: number, formation: Formation): Observable<Formation> {
    return this.http.put<Formation>(`${this.apiUrl}/${id}`, formation);
  }

  deleteFormation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  getClub(id: number): Observable<Club> {
    return this.http.get<Club>(`${this.apiUrl}/${id}`);
  }

}
