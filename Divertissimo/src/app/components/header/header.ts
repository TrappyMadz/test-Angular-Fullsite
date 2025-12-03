import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../login/login_service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.loginService.isAuthenticated();
  }

  onLogout(): void {
    this.loginService.logout();
    this.isLoggedIn = false;
  }
}
