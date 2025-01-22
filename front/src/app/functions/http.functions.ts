import { HttpHeaders } from "@angular/common/http";
import { inject } from "@angular/core";
import { CookieService } from "ngx-cookie-service";

export const GET_HEADERS = (): HttpHeaders => {
    const cookieService = inject(CookieService);
    const token = cookieService.get('token');
    return new HttpHeaders(
        {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        }
    );
}