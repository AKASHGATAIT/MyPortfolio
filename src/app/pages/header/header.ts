import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIconModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  isMenuOpen: boolean = false;
  isProjectOpen: boolean = false;
  isOtherOpen: boolean = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleProject() {
    this.isProjectOpen = !this.isProjectOpen;
    this.isOtherOpen = false;
  }

  toggleOther() {
    this.isOtherOpen = !this.isOtherOpen;
    this.isProjectOpen = false;
  }

  closeMenu() {
    this.isMenuOpen = false;
    this.isProjectOpen = false;
    this.isOtherOpen = false;
  }
}
