import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login_service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  username: string = '';
  password: string = '';
  loginError: boolean = false;
  isLoggedIn: boolean = false;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.loginService.isAuthenticated();
    if (this.isLoggedIn) {
      this.router.navigate(['/profile']);
    }
  }

  onLoginSubmit(): void {
    this.loginError = false;

    if (this.loginService.login(this.username, this.password)) {
      this.isLoggedIn = true;
      this.router.navigate(['/profile']);
    } else {
      this.loginError = true;
    }
  }
}
