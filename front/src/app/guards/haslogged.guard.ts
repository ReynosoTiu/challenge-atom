import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

export const hasloggedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const cookieService = inject(CookieService);
  const token = cookieService.get('token');
  if (!token) {
    return of(true);
  }
  router.navigate(['/tasks']);
  return of(false);
};
