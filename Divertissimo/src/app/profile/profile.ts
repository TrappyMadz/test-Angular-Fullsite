import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login_service';
import { Router } from '@angular/router';
import { Button } from '../components/button/button';

@Component({
  selector: 'app-profile',
  imports: [Button],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  username: string = '';
  password: string = '';
  loginError: boolean = false;
  isLoggedIn: boolean = false;
  constructor(private loginService: LoginService, private router: Router) {}
  ngOnInit(): void {
    this.isLoggedIn = this.loginService.isAuthenticated();
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
    }
  }

  Logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
