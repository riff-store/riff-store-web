import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { Dashboard } from './components/dashboard/dashboard';
import { Products } from './components/products/products';
import { Categories } from './components/categories/categories';
import { Orders } from './components/orders/orders';
import { Cart } from './components/cart/cart';
import { AdminProducts } from './components/admin/admin-products/admin-products';
import { AdminOrders } from './components/admin/admin-orders/admin-orders';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'dashboard', component: Dashboard },
  { path: 'products', component: Products },
  { path: 'categories', component: Categories },
  { path: 'orders', component: Orders },
  { path: 'cart', component: Cart },
  { path: 'admin/products', component: AdminProducts },
  { path: 'admin/orders', component: AdminOrders },
];