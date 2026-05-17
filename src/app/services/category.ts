import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private api = 'http://localhost:3000';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private headers() {
    return new HttpHeaders({ Authorization: `Bearer ${this.auth.getToken()}` });
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/categories`);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.api}/categories/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${this.api}/categories`, data, { headers: this.headers() });
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put(`${this.api}/categories/${id}`, data, { headers: this.headers() });
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.api}/categories/${id}`, { headers: this.headers() });
  }
}