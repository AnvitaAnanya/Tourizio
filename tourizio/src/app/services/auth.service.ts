import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  public isLoading$ = this.isLoadingSubject.asObservable();

  private errorSubject = new BehaviorSubject<string | null>(null);
  public error$ = this.errorSubject.asObservable();

  constructor(private auth: Auth) {
    // Listen to authentication state changes
    onAuthStateChanged(this.auth, (user) => {
      this.currentUserSubject.next(user);
    });
  }

  /**
   * Sign up a new user with email and password
   */
  async signUp(email: string, password: string): Promise<void> {
    try {
      this.isLoadingSubject.next(true);
      this.errorSubject.next(null);
      
      await createUserWithEmailAndPassword(this.auth, email, password);
    } catch (error: any) {
      const errorMessage = this.getErrorMessage(error.code);
      this.errorSubject.next(errorMessage);
      throw new Error(errorMessage);
    } finally {
      this.isLoadingSubject.next(false);
    }
  }

  /**
   * Log in user with email and password
   */
  async login(email: string, password: string): Promise<void> {
    try {
      this.isLoadingSubject.next(true);
      this.errorSubject.next(null);
      
      await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error: any) {
      const errorMessage = this.getErrorMessage(error.code);
      this.errorSubject.next(errorMessage);
      throw new Error(errorMessage);
    } finally {
      this.isLoadingSubject.next(false);
    }
  }

  /**
   * Log out the current user
   */
  async logout(): Promise<void> {
    try {
      this.isLoadingSubject.next(true);
      this.errorSubject.next(null);
      
      await signOut(this.auth);
    } catch (error: any) {
      const errorMessage = this.getErrorMessage(error.code);
      this.errorSubject.next(errorMessage);
      throw new Error(errorMessage);
    } finally {
      this.isLoadingSubject.next(false);
    }
  }

  /**
   * Get the current user
   */
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  /**
   * Convert Firebase error codes to user-friendly messages
   */
  private getErrorMessage(code: string): string {
    const errorMessages: { [key: string]: string } = {
      'auth/email-already-in-use': 'Email is already in use. Please try a different email.',
      'auth/invalid-email': 'Invalid email address. Please enter a valid email.',
      'auth/weak-password': 'Password is too weak. Please use at least 6 characters.',
      'auth/user-not-found': 'User not found. Please check your email or sign up.',
      'auth/wrong-password': 'Incorrect password. Please try again.',
      'auth/invalid-credential': 'Invalid email or password. Please try again.',
      'auth/too-many-requests': 'Too many login attempts. Please try again later.',
      'auth/operation-not-allowed': 'This operation is not allowed. Please contact support.',
    };

    return errorMessages[code] || 'An error occurred. Please try again.';
  }
}
