import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  emailUser: string | null = null;
  role: string | null = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.userService.emailUser$.subscribe(email => {
      this.emailUser = email;
    });

    this.userService.role$.subscribe(role => {
      //console.log("Role in Navbar:", role);
      this.role = role;
    });
  }

  isAdmin(): boolean {
    return this.userService.isAdmin();
  }

  logout() {
    this.userService.clearEmail();
    this.userService.clearRole();
    sessionStorage.removeItem("user");
    this.router.navigateByUrl("/login");
  }
}
