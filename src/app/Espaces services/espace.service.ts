import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Espace } from '../espace';

@Injectable({
  providedIn: 'root'
})
export class EspaceService {
  private apiUrl = 'http://localhost:9090/api/espace';

  constructor(private http: HttpClient) { }

  getAllEspaces(): Observable<Espace[]> {
    return this.http.get<Espace[]>(`${this.apiUrl}/getAll`);
  }

  getEspaceById(id: number): Observable<Espace> {
    return this.http.get<Espace>(`${this.apiUrl}/get/${id}`);
  }

  addEspace(espace: Espace): Observable<Espace> {
    return this.http.post<Espace>(`${this.apiUrl}/add`, espace);
  }

  updateEspace(id: number, espace: Espace): Observable<Espace> {
    return this.http.put<Espace>(`${this.apiUrl}/update/${id}`, espace);
  }

  deleteEspace(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

        uploadImage(id: number, formData: FormData): Observable<any> {
          return this.http.post<any>(`${this.apiUrl}/uploadImage/${id}`, formData, {
            reportProgress: true,
            responseType: 'json'
          });
        }
        searchEspaces(nom: string): Observable<Espace[]> {
          return this.http.get<Espace[]>(`${this.apiUrl}/search?nom=${nom}`);
        }
}
