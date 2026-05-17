import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product';
import { CategoryService } from '../../services/category';

@Component({
  selector: 'app-products',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  filtered: any[] = [];
  search = '';
  selectedCat: number | null = null;
  selectedProduct: any = null;
  qty = 1;
  cart: any[] = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.cart = JSON.parse(localStorage.getItem('riff_cart') || '[]');
    this.productService.getAll().subscribe(p => {
      this.products = p;
      this.filtered = p;
    });
    this.categoryService.getAll().subscribe(c => this.categories = c);
  }

  filter() {
    this.filtered = this.products.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(this.search.toLowerCase()) ||
        p.brand.toLowerCase().includes(this.search.toLowerCase());
      const matchCat = this.selectedCat ? p.categoryId === this.selectedCat : true;
      return matchSearch && matchCat;
    });
  }

  selectCat(id: number | null) {
    this.selectedCat = id;
    this.filter();
  }

  getCatName(id: number) {
    return this.categories.find(c => c.id === id)?.name || '—';
  }

  getCatIcon(name: string) {
    if (!name) return '🎸';
    const n = name.toLowerCase();
    if (n.includes('guitar') || n.includes('guitarra')) return '🎸';
    if (n.includes('amp') || n.includes('amplif')) return '🔊';
    if (n.includes('pedal') || n.includes('efeito')) return '🎛️';
    if (n.includes('baixo') || n.includes('bass')) return '🎵';
    if (n.includes('bateria') || n.includes('drum')) return '🥁';
    return '🎵';
  }

  openDetail(p: any) {
    this.selectedProduct = p;
    this.qty = 1;
  }

  closeDetail() { this.selectedProduct = null; }

  changeQty(d: number) { this.qty = Math.max(1, this.qty + d); }

  addToCart() {
    const ex = this.cart.find(i => i.productId === this.selectedProduct.id);
    if (ex) ex.quantity += this.qty;
    else this.cart.push({
      productId: this.selectedProduct.id,
      quantity: this.qty,
      name: this.selectedProduct.name,
      price: this.selectedProduct.price,
      brand: this.selectedProduct.brand
    });
    localStorage.setItem('riff_cart', JSON.stringify(this.cart));
    this.closeDetail();
  }

  fmt(v: number) {
    return Number(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
}