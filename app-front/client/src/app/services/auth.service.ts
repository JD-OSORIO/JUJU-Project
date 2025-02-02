import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'token_books'

  baseUrl = 'http://localhost:3000/api/v1/auth'

constructor(private http: HttpClient) { }

register(formValue: any): Observable<any>{
  return this.http.post(`${this.baseUrl}/register`, formValue)
}

login(user: any): Observable<any>{
  return this.http.post(`${this.baseUrl}/login`, user).pipe(
    tap((res:any)=>{ this.storeToken(res.token)})
  )
}

logout():void{
  localStorage.removeItem(this.tokenKey)
}

isLogged():boolean{
  return !!localStorage.getItem(this.tokenKey)
}

private storeToken(token: string): void{
  localStorage.setItem(this.tokenKey,token)
}

getToken(): string | null{
  return localStorage.getItem(this.tokenKey)
}

getUser(): any{
  const token = this.getToken()
  if(!token) return null

  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return {id: payload.user_id, role: payload.role}
  } catch (error) {
    console.error('Error decodificando token', error)
    return null
  }
}

isOwner(bookUserId: string): boolean {
  const user = this.getUser();
  return user ? user.id === bookUserId : false;
}

getUserRole(): string {
  const user = this.getUser();
  return user?.role || '';
}

}
