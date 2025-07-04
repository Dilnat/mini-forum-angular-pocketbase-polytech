import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { App } from './app';
import { LoginComponent } from './login/login.component';
import { SujetsListsComponent } from './sujets-list/sujets-lists.component';
import { SujetDetailComponent } from './sujet-detail/sujet-detail.component';
import { PostFormComponent } from './post-form/post-form.component';

@NgModule({
  // Les composants standalone ne doivent pas être déclarés ici
  declarations: [],
  imports: [],
})
export class AppModule {}
