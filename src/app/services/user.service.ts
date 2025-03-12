import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private emailSubject = new BehaviorSubject<string>("");
  private roleSubject = new BehaviorSubject<string>("");

  constructor(private router: Router) {
    const user = JSON.parse(sessionStorage.getItem("user") || "{}");
    if (user) {
      this.emailSubject.next(user.email);
      this.roleSubject.next(user.role);
    }
  }

  setEmail(email: string) {
    this.emailSubject.next(email);
  }

  setRole(role: string) {
    console.log("Setting Role:", role);
    this.roleSubject.next(role);
  }

  getRole(): string {
    return this.roleSubject.value;
  }

  get emailUser$() {
    return this.emailSubject.asObservable();
  }

  get role$() {
    return this.roleSubject.asObservable();
  }

  clearEmail() {
    this.emailSubject.next("");
  }

  clearRole() {
    this.roleSubject.next("");
  }

  isAdmin(): boolean {
    return this.roleSubject.value === "Admin";
  }

  redirectBasedOnRole(): void {
    if (this.isAdmin()) {
      this.router.navigate(['/genres']);
    } else {
      this.router.navigate(['/']); 
    }
  }
}
