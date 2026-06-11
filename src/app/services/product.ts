import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private api = 'https://riff-store-api-production.up.railway.app';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private headers() {
    return new HttpHeaders({ Authorization: `Bearer ${this.auth.getToken()}` });
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/products`);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.api}/products/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${this.api}/products`, data, { headers: this.headers() });
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put(`${this.api}/products/${id}`, data, { headers: this.headers() });
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.api}/products/${id}`, { headers: this.headers() });
  }
}