import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PocketbaseService } from '../services/pocketbase.service';
import { CommonModule } from '@angular/common';
import { SujetFormComponent } from './sujet-form.component';
import { Sujet } from '../models/sujet.model';

@Component({
  selector: 'app-sujets-list',
  standalone: true,
  imports: [CommonModule, SujetFormComponent],
  templateUrl: './sujets-lists.component.html',
  styleUrls: ['./sujets-lists.component.scss']
})
export class SujetsListsComponent implements OnInit {
  sujets: Sujet[] = [];
  loading = true;
  showForm = false;

  // Pagination
  page = 1;
  pageSize = 10;
  get pagedSujets(): Sujet[] {
    const start = (this.page - 1) * this.pageSize;
    return this.sujets.slice(start, start + this.pageSize);
  }
  get totalPages(): number {
    return Math.ceil(this.sujets.length / this.pageSize);
  }

  constructor(private pb: PocketbaseService, private router: Router) {}

  ngOnInit() {
    this.loadSujets();
  }

  async loadSujets() {
    this.loading = true;
    // Récupère les sujets avec les posts expandus
    this.sujets = await this.pb.getSujets();
    // Pour chaque sujet, récupère le nombre de posts (requête séparée si besoin)
    for (const sujet of this.sujets) {
      const posts = await this.pb.getPosts(sujet.id);
      sujet.nbPosts = posts.length;
      sujet.lastPostDate = posts.length ? posts[posts.length - 1].created : undefined;
    }
    this.loading = false;
  }

  goToSujet(sujet: any) {
    this.router.navigate(['/sujet', sujet.id]);
  }

  nouveauSujet() {
    this.showForm = true;
  }

  onSujetCreated() {
    this.showForm = false;
    this.page = 1; // reset page on new sujet
    this.loadSujets();
  }
  onCancel() {
    this.showForm = false;
  }
  setPage(p: number) {
    if (p >= 1 && p <= this.totalPages) this.page = p;
  }
}
