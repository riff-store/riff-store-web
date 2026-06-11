import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private api = 'https://riff-store-api-production.up.railway.app';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private headers() {
    return new HttpHeaders({ Authorization: `Bearer ${this.auth.getToken()}` });
  }

  create(items: any[]): Observable<any> {
    return this.http.post(`${this.api}/orders`, { items }, { headers: this.headers() });
  }

  getMyOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/orders/me`, { headers: this.headers() });
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/orders`, { headers: this.headers() });
  }

  updateStatus(id: number, status: string): Observable<any> {
    return this.http.patch(`${this.api}/orders/${id}/status`, { status }, { headers: this.headers() });
  }
}