import { User } from './user.model';

export interface Post {
  id: string;
  contenu: string;
  auteur: User;
  sujetId: string;
  created: string;
  updated?: string;
}
