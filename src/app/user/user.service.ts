import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from './Dto/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:9090/user';

  constructor(private http: HttpClient) { }

  displayUsers(): Observable<User[]> {
    return this.http.get<any>(this.apiUrl)
      .pipe(
        map(response => response),
        catchError(error => {
          console.error('Error fetching users:', error);
          return throwError(error);
        })
      );
  }
}
