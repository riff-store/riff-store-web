import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { ProductService } from '../../services/product';
import { OrderService } from '../../services/order';
import { CategoryService } from '../../services/category';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  user: any = null;
  isAdmin = false;
  products: any[] = [];
  categories: any[] = [];
  orders: any[] = [];

  constructor(
    private auth: AuthService,
    private productService: ProductService,
    private orderService: OrderService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.auth.getUser();
    this.isAdmin = this.auth.isAdmin();
    this.loadData();
  }

  loadData() {
    this.productService.getAll().subscribe(p => this.products = p);
    this.categoryService.getAll().subscribe(c => this.categories = c);
    if (this.isAdmin) {
      this.orderService.getAll().subscribe(o => this.orders = o);
    } else {
      this.orderService.getMyOrders().subscribe(o => this.orders = o);
    }
  }

  get totalStock() {
    return this.products.reduce((a, p) => a + p.stock, 0);
  }

  get totalRevenue() {
    return this.orders
      .filter(o => o.status !== 'CANCELLED')
      .reduce((a, o) => a + Number(o.total), 0);
  }

  fmt(v: number) {
    return Number(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}