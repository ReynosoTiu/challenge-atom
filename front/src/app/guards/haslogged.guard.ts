import { CanActivateFn, Router } from '@angular/router';
import { GET_HEADERS } from '../functions/http.functions';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { of, map, catchError } from 'rxjs';
import { environment } from '../../environments/environment';
import { GET_USER_RESPONSE } from '../interfaces/users.interfaces';
import { CookieService } from 'ngx-cookie-service';

export const hasloggedGuard: CanActivateFn = (route, state) => {
  const http = inject(HttpClient);
  const router = inject(Router);
  const cookieService = inject(CookieService);
  const email = cookieService.get('email');
  const API_URL = environment.API_URL + '/users';
  if (!email) {
    return of(true);
  }

  const headers = GET_HEADERS();
  return http.get<GET_USER_RESPONSE>(`${API_URL}/${email}`, { headers }).pipe(
    map((res) => {
      if (res.email) {
        router.navigate(['/tasks']);
        return false;
      } else {
        cookieService.delete('email');
        return true;
      }
    }),
    catchError(() => {
      return of(true);;
    })
  );
};
