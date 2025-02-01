import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

   private baseUrl = 'http://localhost:3000/api/v1/users';

    constructor(private http: HttpClient) {}

    getAll(): Observable<any> {
      return this.http.get(this.baseUrl).pipe(
        catchError(this.handleError)
      );
    }

    getById(userId: string): Observable<any> {
      return this.http.get(`${this.baseUrl}/${userId}`).pipe(
        catchError(this.handleError)
      );
    }

    update(userId: string, user: any): Observable<any> {
      return this.http.put(`${this.baseUrl}/${userId}`, user).pipe(
        catchError(this.handleError)
      );
    }

    delete(userId: string): Observable<any> {
      return this.http.delete(`${this.baseUrl}/${userId}`).pipe(
        catchError(this.handleError)
      );
    }

    private handleError(error: any) {
      console.error('Error en la API', error);
      return throwError(() => error);
    }
}
