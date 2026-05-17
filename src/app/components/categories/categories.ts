import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../../services/category';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-categories',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './categories.html',
  styleUrl: './categories.css'
})
export class Categories implements OnInit {
  categories: any[] = [];
  isAdmin = false;
  showModal = false;
  editing: any = null;
  form = { name: '', description: '' };

  constructor(
    private categoryService: CategoryService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.isAdmin = this.auth.isAdmin();
    this.load();
  }

  load() {
    this.categoryService.getAll().subscribe(c => this.categories = c);
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

  openModal(cat?: any) {
    this.editing = cat || null;
    this.form = { name: cat?.name || '', description: cat?.description || '' };
    this.showModal = true;
  }

  closeModal() { this.showModal = false; }

  save() {
    if (!this.form.name) return;
    if (this.editing) {
      this.categoryService.update(this.editing.id, this.form).subscribe(() => {
        this.load(); this.closeModal();
      });
    } else {
      this.categoryService.create(this.form).subscribe(() => {
        this.load(); this.closeModal();
      });
    }
  }

  delete(id: number) {
    if (!confirm('Remover esta categoria?')) return;
    this.categoryService.delete(id).subscribe(() => this.load());
  }
}