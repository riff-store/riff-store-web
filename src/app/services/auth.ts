import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = 'https://riff-store-api-production.up.railway.app';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(
      `${this.api}/auth/login`,
      { email, password },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(
      `${this.api}/auth/register`,
      { name, email, password },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  saveToken(token: string, user: any) {
    localStorage.setItem('riff_token', token);
    localStorage.setItem('riff_user', JSON.stringify(user));
  }

  getToken(): string | null {
    return localStorage.getItem('riff_token');
  }

  getUser(): any {
    const u = localStorage.getItem('riff_user');
    return u ? JSON.parse(u) : null;
  }

  isAdmin(): boolean {
    return this.getUser()?.role === 'ADMIN';
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('riff_token');
    localStorage.removeItem('riff_user');
  }
}