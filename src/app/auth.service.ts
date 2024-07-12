import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { User } from './back-office/users/Dto/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:9090/auth';

  constructor(private http: HttpClient) { }

  signup(signupRequest: any): Observable<User[]> {
    return this.http.post<any>(`${this.apiUrl}/signup`, signupRequest)
      .pipe(
        map(response => response.data),
        catchError(error => {
          console.error('Error signing up:', error);
          return throwError(error);
        })
      );
  }
  signin(signinRequest: any): Observable<User[]> {
    return this.http.post<any>(`${this.apiUrl}/sigin`, signinRequest)
      .pipe(
        map(response => response),
        catchError(error => {
          console.error('Error signing up:', error);
          return throwError(error);
        })
      );
  }
  sendResetPasswordSMS(email: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'text/plain',
      'Accept': 'text/plain'
    });
    return this.http.post<any>(`${this.apiUrl}/sendResetPasswordSMS`, email, { headers, responseType: 'text' as 'json' })
      .pipe(
        map(response => response),
        catchError(error => {
          console.error('Error sending reset password SMS:', error);
          return throwError(error);
        })
      );
  }
  resetPassword(email: string, resetCode: string, newPassword: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': '*/*'
    });
    return this.http.post<any>(`${this.apiUrl}/resetPassword`, { email, resetCode, newPassword }, { headers, responseType: 'text' as 'json' })
      .pipe(
        map(response => response),
        catchError(error => {
          console.error('Error sending reset password SMS:', error);
          return throwError(error);
        })
      );
  }
}
