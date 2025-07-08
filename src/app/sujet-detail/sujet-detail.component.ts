import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostFormComponent } from '../post-form/post-form.component';
import { PocketbaseService } from '../services/pocketbase.service';

@Component({
  selector: 'app-sujet-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, PostFormComponent],
  templateUrl: './sujet-detail.component.html',
  styleUrls: ['./sujet-detail.component.scss']
})
export class SujetDetailComponent implements OnInit {
  sujet: any;
  posts: any[] = [];
  // Pagination pour les posts
  postPage = 1;
  postPageSize = 10;
  get pagedPosts(): any[] {
    const start = (this.postPage - 1) * this.postPageSize;
    return this.posts.slice(start, start + this.postPageSize);
  }
  get postTotalPages(): number {
    return Math.ceil(this.posts.length / this.postPageSize);
  }
  get postPages(): number[] {
    return Array.from({ length: this.postTotalPages }, (_, i) => i + 1);
  }
  setPostPage(p: number) {
    if (p >= 1 && p <= this.postTotalPages) this.postPage = p;
  }
  loading = true;
  editingPostId: string | null = null;
  editedContent: string = '';
  editingSujet = false;
  editedTitre = '';

  constructor(
    private route: ActivatedRoute,
    private pb: PocketbaseService,
    private router: Router
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // Récupère le sujet avec l'expansion de l'auteur
      const sujets = await this.pb.pbInstance.collection('sujets').getFullList({
        filter: `id="${id}"`,
        expand: 'auteur'
      });
      this.sujet = sujets[0];
      // Récupère les posts avec l'expansion de l'auteur
      this.posts = await this.pb.pbInstance.collection('posts').getFullList({
        filter: `sujet="${id}"`,
        expand: 'auteur'
      });
    }
    this.postPage = 1; // reset page on reload
    this.loading = false;
  }

  get currentUserId() {
    return this.pb.currentUser?.id;
  }

  isOwner(post: any) {
    return post.auteur === this.currentUserId || post.expand?.auteur?.id === this.currentUserId;
  }

  async deletePost(postId: string) {
    await this.pb.deletePost(postId);
    this.ngOnInit();
  }

  startEdit(post: any) {
    this.editingPostId = post.id;
    this.editedContent = post.contenu;
  }

  cancelEdit() {
    this.editingPostId = null;
    this.editedContent = '';
  }

  async saveEdit(post: any) {
    await this.pb.updatePost(post.id, { contenu: this.editedContent });
    this.editingPostId = null;
    this.editedContent = '';
    this.ngOnInit();
  }

  startSujetEdit() {
    this.editingSujet = true;
    this.editedTitre = this.sujet.titre;
  }

  cancelSujetEdit() {
    this.editingSujet = false;
    this.editedTitre = '';
  }

  async saveSujetEdit() {
    await this.pb.updateSujet(this.sujet.id, { titre: this.editedTitre });
    this.editingSujet = false;
    this.editedTitre = '';
    this.ngOnInit();
  }

  async deleteSujet() {
    await this.pb.deleteSujet(this.sujet.id);
    this.router.navigate(['/sujets']);
  }

  // Remplacer la méthode async isSujetOwner par une version synchrone
  isSujetOwner(): boolean {
    const currentUserId = this.pb.currentUser?.id;
    return this.sujet?.auteur === currentUserId || this.sujet?.expand?.auteur?.id === currentUserId;
  }
}
