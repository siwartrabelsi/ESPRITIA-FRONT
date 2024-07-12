// participant.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Participant } from './participant';


@Injectable({
  providedIn: 'root'
})
export class ParticipantService {
  
  private apiUrl = 'http://localhost:9090/api/participants'; 

  constructor(private http: HttpClient) { }

  getAllParticipants(): Observable<Participant[]> {
    return this.http.get<Participant[]>(this.apiUrl);
  }

  getParticipantById(id: number): Observable<Participant> {
    return this.http.get<Participant>(`${this.apiUrl}/${id}`);
  }

  createParticipant(participant: Participant, formationId: number): Observable<Participant> {
    return this.http.post<Participant>(`${this.apiUrl}/${formationId}`, participant);
  }

  updateParticipant(id: number, participant: Participant): Observable<Participant> {
    return this.http.put<Participant>(`${this.apiUrl}/${id}`, participant);
  }

  deleteParticipant(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
