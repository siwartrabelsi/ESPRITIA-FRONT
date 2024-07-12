// src/app/evenement.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evenement } from './Model/Evenement';

@Injectable({
  providedIn: 'root',
})
export class EvenementService {
  private apiUrl = 'http://localhost:9090/evenements';

  constructor(private http: HttpClient) {}

  getEvenements(): Observable<Evenement[]> {
    return this.http.get<Evenement[]>(this.apiUrl);
  }

  getEvenement(id: number): Observable<Evenement> {
    return this.http.get<Evenement>(`${this.apiUrl}/${id}`);
  }

  createEvenement(evenement: Evenement): Observable<Evenement> {
    return this.http.post<Evenement>(this.apiUrl, evenement);
  }
  addEvenement(formData: FormData): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/ajouter`, formData);
  }
  
  updateEvenement(id: number, formData: FormData): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        enctype: 'multipart/form-data',
      }),
    };

    return this.http.put<any>(
      `http://localhost:9090/evenements/${id}`,
      formData,
      httpOptions
    );
  }



  deleteEvenement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


  participerEvenementF(eventId: number, userId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${eventId}/participer/${userId}`, { eventId, userId });
  }

  getEvenementsByUserId(userId: number): Observable<Evenement[]> {
    return this.http.get<Evenement[]>(`${this.apiUrl}/user/${userId}`);
  }


  affecterEvenement(evenementId: number, clubId: number): Observable<string> {
    return this.http.post(
      `${this.apiUrl}/${evenementId}/affecter/${clubId}`,
      null,
      { responseType: 'text' }
    );
  }

}
