import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PocketbaseService } from '../services/pocketbase.service';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent {
  @Input() sujetId!: string;
  @Output() postCreated = new EventEmitter<void>();
  contenu = '';
  loading = false;

  constructor(private pb: PocketbaseService) {}

  async submit() {
    if (!this.contenu.trim()) return;
    this.loading = true;
    await this.pb.createPost({ contenu: this.contenu, sujet: this.sujetId });
    this.contenu = '';
    this.loading = false;
    this.postCreated.emit();
  }
}
