import { User } from './user.model';

export interface Sujet {
  id: string;
  titre: string;
  auteur: User;
  created: string;
  updated?: string;
  nbPosts?: number;
  lastPostDate?: string;
}
