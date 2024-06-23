import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Club } from './club';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  private apiUrl = 'http://localhost:9090/api/clubs';

  constructor(private http: HttpClient) { }

  getClubs(): Observable<Club[]> {
    return this.http.get<Club[]>(this.apiUrl);
  }

  getClub(id: number): Observable<Club> {
    return this.http.get<Club>(`${this.apiUrl}/${id}`);
  }

  createClub(club: Club): Observable<Club> {
    return this.http.post<Club>(this.apiUrl, club);
  }

  updateClub(id: number, club: Club): Observable<Club> {
    return this.http.put<Club>(`${this.apiUrl}/${id}`, club);
  }

  deleteClub(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  searchClubs(nom: string): Observable<Club[]> {
    return this.http.get<Club[]>(`${this.apiUrl}/search?nom=${nom}`);
  }
  likeClub(id: number): Observable<Club> {
    return this.http.post<Club>(`${this.apiUrl}/${id}/like`, {});
  }

  dislikeClub(id: number): Observable<Club> {
    return this.http.post<Club>(`${this.apiUrl}/${id}/dislike`, {});
  }
  

  downloadPdf(clubId: number): Observable<Blob> {
    const url = `${this.apiUrl}/${clubId}/pdf`;
    return this.http.get(url, { responseType: 'blob' });
  }

 

  getQRCodeUrl(clubId: number): string {
    return `${this.apiUrl}/${clubId}/qrcode`;
  }

  generateQRCode(clubId: number): Observable<Blob> {
    const url = `${this.apiUrl}/${clubId}/qrcode`;
    return this.http.get(url, { responseType: 'blob' });
  }

  getTotalClubsCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/stats/total-clubs`);
  }

  getTotalLikesCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/stats/total-likes`);
  }

  getTotalDislikesCount(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/stats/total-dislikes`);
  }
}