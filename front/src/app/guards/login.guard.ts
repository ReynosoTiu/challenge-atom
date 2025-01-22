import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const cookieService = inject(CookieService);
  const token = cookieService.get('token');
  if (!token) {
    router.navigate(['/auth']);
    return of(false);;
  }
  return of(true);
};
