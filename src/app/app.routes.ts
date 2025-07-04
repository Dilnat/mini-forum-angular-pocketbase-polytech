import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SujetsListsComponent } from './sujets-list/sujets-lists.component';
import { SujetDetailComponent } from './sujet-detail/sujet-detail.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'sujets', component: SujetsListsComponent },
    { path: 'sujet/:id', component: SujetDetailComponent },
    { path: '', redirectTo: 'sujets', pathMatch: 'full' }
];
