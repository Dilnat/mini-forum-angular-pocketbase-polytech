import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { PocketbaseService } from './services/pocketbase.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'mini-forum';

  constructor(public router: Router, public pb: PocketbaseService) {}

  get currentUser() {
    return this.pb.currentUser;
  }

  get isLoggedIn() {
    return this.pb.isLoggedIn();
  }

  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.pb.logout();
    this.router.navigate(['/login']);
  }
}
