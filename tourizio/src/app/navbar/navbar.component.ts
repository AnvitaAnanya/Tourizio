import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  menuActive = false;
  isAuthenticated = false;
  currentUser$: Observable<User | null>;
  isLoggingOut = false;

  constructor(private authService: AuthService, private router: Router) {
    this.currentUser$ = this.authService.currentUser$;
  }

  ngOnInit() {
    // Subscribe to authentication state
    this.authService.currentUser$.subscribe((user) => {
      this.isAuthenticated = user !== null;
    });
  }

  toggleMenu() {
    this.menuActive = !this.menuActive;
  }

  closeMenu() {
    this.menuActive = false;
  }

  async logout() {
    try {
      this.isLoggingOut = true;
      await this.authService.logout();
      this.closeMenu();
      await this.router.navigate(['/login']);
    } catch (error: any) {
      console.error('Logout failed:', error);
    } finally {
      this.isLoggingOut = false;
    }
  }
}
