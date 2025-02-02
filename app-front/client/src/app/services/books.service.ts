import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private baseUrl = 'http://localhost:3000/api/v1/books';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.baseUrl).pipe(
      catchError(this.handleError)
    );
  }

  getById(bookId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${bookId}`).pipe(
      catchError(this.handleError)
    );
  }

  create(book: any): Observable<any> {
    return this.http.post(this.baseUrl, book).pipe(
      catchError(this.handleError)
    );
  }

  update(bookId: string, book: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${bookId}`, book).pipe(
      catchError(this.handleError)
    );
  }

  delete(bookId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${bookId}`).pipe(
      catchError(this.handleError)
    );
  }
  /*Separo los errores de esta manera no duplico codigo y solo lo aplico
  en cada uno de los servicios para el correcto manejo de errores */

  private handleError(error: any) {
    console.error('Error en la API', error);
    return throwError(() => error);
  }
}
