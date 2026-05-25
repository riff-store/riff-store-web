import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.error = '';

    if (!this.email || !this.password) {
      this.error = 'Preencha email e senha';
      return;
    }

    console.log('TENTANDO LOGIN:', {
      email: this.email,
      password: this.password
    });

    this.auth.login(this.email, this.password).subscribe({
      next: (data) => {
        console.log('LOGIN OK:', data);

        this.auth.saveToken(data.token, data.user);

        this.router.navigate(['/dashboard']);
      },

      error: (e) => {
        console.log('ERRO LOGIN BACKEND:', e);

        this.error = e.error?.message || 'Erro ao fazer login';
      }
    });
  }
}