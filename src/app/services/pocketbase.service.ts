import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { Sujet } from '../models/sujet.model';
import { Post } from '../models/post.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class PocketbaseService {
  private pb: PocketBase;

  constructor() {
    this.pb = new PocketBase('http://127.0.0.1:8090');
  }

  async login(email: string, password: string) {
    return this.pb.collection('users').authWithPassword(email, password);
  }

  async getSujets(): Promise<Sujet[]> {
    const sujets = await this.pb.collection('sujets').getFullList({ expand: 'created_by' });
    // Adapter le mapping pour retourner des objets Sujet typés
    return sujets.map((s: any) => ({
      id: s.id,
      titre: s.titre,
      auteur: s.expand?.auteur,
      created: s.created,
      updated: s.updated,
      nbPosts: s.nbPosts,
      lastPostDate: s.lastPostDate
    }));
  }

  async createSujet(data: { titre: string }) {
    // Ajoute l'utilisateur connecté comme auteur (relation user)
    const userId = this.pb.authStore.model?.id;
    return this.pb.collection('sujets').create({ ...data, auteur: userId });
  }

  async getPosts(sujetId: string): Promise<Post[]> {
    const posts = await this.pb.collection('posts').getFullList({
      filter: `sujet="${sujetId}"`,
      expand: 'created_by'
    });
    // Adapter le mapping pour retourner des objets Post typés
    return posts.map((p: any) => ({
      id: p.id,
      contenu: p.contenu,
      auteur: p.expand?.auteur,
      sujetId: p.sujet,
      created: p.created,
      updated: p.updated
    }));
  }

  async createPost(data: { contenu: string, sujet: string }) {
    // Ajoute l'utilisateur connecté comme auteur (relation user)
    const userId = this.pb.authStore.model?.id;
    return this.pb.collection('posts').create({ ...data, auteur: userId });
  }

  async deletePost(postId: string) {
    return this.pb.collection('posts').delete(postId);
  }

  async updatePost(postId: string, data: { contenu: string }) {
    return this.pb.collection('posts').update(postId, data);
  }

  async deleteSujet(sujetId: string) {
    return this.pb.collection('sujets').delete(sujetId);
  }

  async updateSujet(sujetId: string, data: { titre: string }) {
    return this.pb.collection('sujets').update(sujetId, data);
  }

  get pbInstance() {
    return this.pb;
  }

  get currentUser() {
    return this.pb.authStore.model;
  }
}
