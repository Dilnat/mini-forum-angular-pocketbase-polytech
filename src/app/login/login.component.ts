import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PocketbaseService } from '../services/pocketbase.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;

  constructor(private pb: PocketbaseService, private router: Router) {}

  async login() {
    this.loading = true;
    try {
      await this.pb.login(this.email, this.password);
      this.router.navigate(['/sujets']);
    } catch (e) {
      alert('Erreur de connexion : vérifiez vos identifiants.');
    }
    this.loading = false;
  }
}
