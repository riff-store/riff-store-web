import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  nome: string = '';
  email: string = '';
  senha: string = '';
  confirmarSenha: string = '';
  erro: string = '';

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  cadastrar() {
    this.erro = '';

    if (!this.nome || !this.email || !this.senha || !this.confirmarSenha) {
      this.erro = 'Preencha todos os campos.';
      return;
    }

    if (this.senha !== this.confirmarSenha) {
      this.erro = 'As senhas não coincidem.';
      return;
    }

    if (this.senha.length < 6) {
      this.erro = 'A senha deve ter pelo menos 6 caracteres.';
      return;
    }

    const data = {
      name: this.nome,
      email: this.email,
      password: this.senha
    };

    this.http.post('http://localhost:3000/auth/register', data)
      .subscribe({
        next: (res) => {
          console.log('Usuário criado:', res);
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.log('Erro no cadastro:', err);
          this.erro = err.error?.message || 'Erro ao cadastrar';
        }
      });
  }
}