import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private cookieService: CookieService) { }

  GET_HEADERS = (): HttpHeaders => {
    const token = this.cookieService.get('token');
    return new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      }
    );
  }
}
