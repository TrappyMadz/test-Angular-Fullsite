import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from './login/login_service';

export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);

  if (loginService.isAuthenticated()) {
    return true;
  } else {
    // Route to the login page. Urltree is used to indicate that the path is blocked.
    return router.createUrlTree(['/login']);
  }
};
