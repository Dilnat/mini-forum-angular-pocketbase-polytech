import { CommonModule } from '@angular/common';
import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PocketbaseService } from '../services/pocketbase.service';

@Component({
  selector: 'app-sujet-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <form class="sujet-form" (ngSubmit)="submit()">
      <input [(ngModel)]="titre" name="titre" placeholder="Titre du sujet" required />
      <button type="submit" [disabled]="loading">Créer</button>
      <button type="button" (click)="cancel.emit()">Annuler</button>
    </form>
  `
})
export class SujetFormComponent {
  sujetCreated = output<void>();
  cancel = output<void>();
  titre = '';
  loading = false;

  constructor(private pb: PocketbaseService) {}

  async submit() {
    if (!this.titre.trim()) return;
    this.loading = true;
    await this.pb.createSujet({ titre: this.titre });
    this.titre = '';
    this.loading = false;
    this.sujetCreated.emit();
  }
}
