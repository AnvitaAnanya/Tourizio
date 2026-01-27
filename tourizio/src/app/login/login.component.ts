import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ScrollAnimateDirective } from '../home/scroll-animate.directive';
import { AuthService } from '../services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ScrollAnimateDirective],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  errorMessage = '';
  
  loginData = {
    email: '',
    password: ''
  };
  
  signupData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  private destroy$ = new Subject<void>();

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    // Subscribe to loading state
    this.authService.isLoading$.pipe(takeUntil(this.destroy$)).subscribe(
      (isLoading) => this.isLoading = isLoading
    );

    // Subscribe to error messages
    this.authService.error$.pipe(takeUntil(this.destroy$)).subscribe(
      (error) => this.errorMessage = error || ''
    );

    // Check if user is already logged in
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/home']);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = '';
    // Clear form data when switching modes
    this.loginData = { email: '', password: '' };
    this.signupData = { name: '', email: '', password: '', confirmPassword: '' };
  }

  onSubmit() {
    this.errorMessage = '';
    if (this.isLoginMode) {
      this.handleLogin();
    } else {
      this.handleSignup();
    }
  }

  async handleLogin() {
    if (!this.loginData.email || !this.loginData.password) {
      this.errorMessage = 'Please enter both email and password.';
      return;
    }

    try {
      await this.authService.login(this.loginData.email, this.loginData.password);
      this.router.navigate(['/home']);
    } catch (error: any) {
      this.errorMessage = error.message || 'Login failed. Please try again.';
    }
  }

  async handleSignup() {
    if (!this.signupData.name || !this.signupData.email || 
        !this.signupData.password || !this.signupData.confirmPassword) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    if (this.signupData.password !== this.signupData.confirmPassword) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }

    if (this.signupData.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters long.';
      return;
    }

    try {
      await this.authService.signUp(this.signupData.email, this.signupData.password);
      this.router.navigate(['/home']);
    } catch (error: any) {
      this.errorMessage = error.message || 'Sign up failed. Please try again.';
    }
  }
}

