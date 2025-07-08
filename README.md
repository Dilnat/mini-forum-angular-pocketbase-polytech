# Mini-Forum Angular + PocketBase

## Présentation

Ce projet est un mini-forum web développé avec Angular (standalone components) et connecté à une base de données PocketBase. Il permet l'authentification, la gestion de sujets et de posts, et propose une interface moderne et responsive.

## Fonctionnalités principales

- Authentification (connexion uniquement, pas d'inscription ni de mot de passe oublié)
- Affichage de la liste des sujets avec nombre de posts et date du dernier message
- Détail d'un sujet avec liste des posts et affichage des auteurs
- Création, modification, suppression de sujets et de posts (par leur propriétaire uniquement)
- Pagination sur la liste des sujets et des posts
- Style moderne et responsive sur toutes les pages et formulaires

## Organisation du projet (MVVM)

Le projet suit une architecture MVVM adaptée à Angular :

- **Model** : Interfaces TypeScript pour `User`, `Sujet`, `Post` (dossier `models/`)
- **ViewModel** : Composants Angular qui gèrent l'état, la logique et exposent les données à la vue
- **View** : Templates HTML et SCSS associés à chaque composant
- **Services** : Accès aux données et logique métier (PocketbaseService)

### Structure des dossiers

```
src/app/
  models/
    user.model.ts
    sujet.model.ts
    post.model.ts
  services/
    pocketbase.service.ts
  sujets-list/
    sujets-lists.component.ts/html/scss
    sujet-form.component.ts/html/scss
  sujet-detail/
    sujet-detail.component.ts/html/scss
  post-form/
    post-form.component.ts/html/scss
  login/
    login.component.ts/html/scss
  app.module.ts
  app.routes.ts
```

## Modèles PocketBase

### users (Type: Auth)

- **id** : identifiant unique
- **password** : mot de passe (caché)
- **tokenKey** : clé d'authentification (cachée)
- **email** : email (obligatoire)
- **emailVisibility** : visibilité de l'email
- **verified** : email vérifié
- **name** : nom affiché
- **avatar** : image d'avatar (fichier unique)
- **created** : date de création
- **updated** : date de modification

### sujets (Type: Base)

- **id** : identifiant unique
- **titre** : titre du sujet (obligatoire)
- **auteur** : référence vers un utilisateur (users)
- **created** : date de création
- **updated** : date de modification

### posts (Type: Base)

- **id** : identifiant unique
- **contenu** : texte du post (obligatoire)
- **sujet** : référence vers un sujet (sujets)
- **auteur** : référence vers un utilisateur (users)
- **created** : date de création
- **updated** : date de modification

## Services

- **PocketbaseService** :
  - Authentification (login, currentUser)
  - CRUD sujets : getSujets, createSujet, updateSujet, deleteSujet
  - CRUD posts : getPosts, createPost, updatePost, deletePost
  - Gestion des relations (expand auteur)

## Pages et composants

- **/login** : Formulaire de connexion
- **/sujets-list** : Liste paginée des sujets, bouton pour créer un sujet, accès au détail
- **/sujet-detail/:id** : Détail d'un sujet, liste paginée des posts, édition/suppression inline, formulaire d'ajout de post
- **/post-form** : Formulaire d'ajout de post (utilisé dans le détail d'un sujet)
- **/sujet-form** : Formulaire d'ajout de sujet (utilisé dans la liste des sujets)

## Routing

- `/login` : page de connexion
- `/` : liste des sujets
- `/sujet/:id` : détail d'un sujet

## Pagination

- Pagination côté client sur la liste des sujets et la liste des posts (pageSize configurable)
- Barre de navigation entre les pages avec boutons et style moderne

## Logique d'accès et sécurité

- Seul le propriétaire d'un sujet ou d'un post peut le modifier ou le supprimer (vérification côté client)
- L'auteur est enregistré à la création (relation PocketBase)

## Style

- SCSS moderne et responsive pour tous les composants
- Utilisation de classes dédiées pour éviter les conflits de style

## Pour aller plus loin

- Possibilité d'ajouter confirmation avant suppression, avatars, feedback utilisateur, pagination côté serveur, etc.

## Identifiants de connexion de test

- **Email** : test@test.test
- **Mot de passe** : testangular

---

**Auteur :** Projet réalisé dans le cadre d'un mini-projet Polytech.
