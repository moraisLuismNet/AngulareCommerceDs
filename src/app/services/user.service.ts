import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private emailSubject = new BehaviorSubject<string>(
    localStorage.getItem('emailUsuario') || ''
  );
  email$ = this.emailSubject.asObservable();

  setEmail(email: string): void {
    localStorage.setItem('emailUsuario', email);
    this.emailSubject.next(email);
    console.log('Email establecido en UserService:', email); // Agrega este log
  }

  clearEmail(): void {
    localStorage.removeItem('emailUsuario');
    this.emailSubject.next('');
  }
}
