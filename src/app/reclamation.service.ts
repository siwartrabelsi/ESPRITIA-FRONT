import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { Reclamation } from './models/reclamation.model';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  private apiUrl = 'http://localhost:9090/reclamation';


  constructor(private http: HttpClient) { }

  envoyerReclamation(description: string, imageFile: File): Observable<Reclamation[]> {
    const formData: FormData = new FormData();
    formData.append('description', description);
    formData.append('image', imageFile, imageFile.name);

    return this.http.post<any>(`${this.apiUrl}`, formData)
      .pipe(
        map(response => response.data),
        catchError(error => {
          console.error('Error signing up:', error);
          return throwError(error);
        })
      );
  }
  displayReclamations(): Observable<Reclamation[]> {
    return this.http.get<any>(this.apiUrl)
      .pipe(
        map(response => response),
        catchError(error => {
          console.error('Error fetching users:', error);
          return throwError(error);
        })
      );
  }
  getImageUrl(fileName: string): string {
    return `${this.apiUrl}/${fileName}`;
  }

  getImage(fileName: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${fileName}`, { responseType: 'blob' });
  }
  replyToReclamation(reclamationId: number, reclamation: Reclamation): Observable<Reclamation> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put<Reclamation>(`${this.apiUrl}/${reclamationId}/traiter`, reclamation, { headers }).pipe(
      catchError((error) => {
        console.error('Error replying to reclamation:', error);
        return throwError(error);
      })
    );
  }
  getReclamationByStatus(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/stats`);
  }
  getReclamationsSentiments(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/sentiments`);
  }

}
