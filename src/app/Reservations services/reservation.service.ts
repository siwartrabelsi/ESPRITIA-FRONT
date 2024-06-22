import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '../reservation';
import { Espace } from '../espace';



@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:9090/api/reservation';

  constructor(private http: HttpClient) { }

  getAllReservation(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}/getAll`);
  }

  getReservationById(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.apiUrl}/get/${id}`);
  }

  addReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(`${this.apiUrl}/add`, reservation);
  }

  updateReservation(id: number, reservation: Reservation): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.apiUrl}/update/${id}`, reservation);
  }

  deleteReservation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
  getEspaceNameById(id: number): Observable<Espace> {
    return this.http.get<Espace>(`${this.apiUrl}/getEspaceById/${id}`);
  }
  

}
