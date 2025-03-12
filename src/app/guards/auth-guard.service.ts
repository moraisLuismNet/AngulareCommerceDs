import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ILoginResponse } from '../interfaces/login.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private router: Router) {}

  getRole(): string {
    const userData = sessionStorage.getItem('user');
    if (userData) {
      const user: ILoginResponse = JSON.parse(userData);
      return user.role || '';
    }
    return '';
  }

  isLoggedIn() {
    const user = sessionStorage.getItem('user');
    if (user) {
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }

  getUser(): string {
    const infoUser = sessionStorage.getItem('user');
    if (infoUser) {
      const userInfo: ILoginResponse = JSON.parse(infoUser);
      return userInfo.email;
    }
    return '';
  }

  getToken(): string {
    const infoUser = sessionStorage.getItem('user');
    if (infoUser) {
      const userInfo: ILoginResponse = JSON.parse(infoUser);
      return userInfo.token;
    }
    return '';
  }
}

