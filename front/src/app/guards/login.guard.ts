import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { of, map, catchError } from 'rxjs';
import { environment } from '../../environments/environment';
import { GET_HEADERS } from '../functions/http.functions';
import { CookieService } from 'ngx-cookie-service';
import { GET_USER_RESPONSE } from '../interfaces/users.interfaces';

export const loginGuard: CanActivateFn = (route, state) => {
  const http = inject(HttpClient);
  const router = inject(Router);
  const cookieService = inject(CookieService);
  const email = cookieService.get('email');
  const API_URL = environment.API_URL + '/users';
  if (!email) {
    router.navigate(['/auth']);
    return of(false);;
  }

  const headers = GET_HEADERS();
  return http.get<GET_USER_RESPONSE>(`${API_URL}/${email}`, { headers }).pipe(
    map((res) => {
      if (res.email) {
        return true;
      } else {
        cookieService.delete('email');
        router.navigate(['/auth']);
        return false;
      }
    }),
    catchError(() => {
      cookieService.delete('email');
      router.navigate(['/auth']);
      return of(false);;
    })
  );
};
