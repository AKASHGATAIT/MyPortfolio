import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Header } from './pages/header/header';
import { Footer } from './pages/footer/footer';

@Component({
  selector: 'app-root',
  imports: [
    Header ,RouterOutlet, Footer
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // protected readonly title = signal('my-app');
}
