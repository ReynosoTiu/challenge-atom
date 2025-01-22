import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ADD_USER_RESPONSE, GET_USER_RESPONSE } from '../interfaces/users.interfaces';
import { GET_HEADERS } from '../functions/http.functions';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  API_URL = environment.API_URL + '/users';
  HEADERS: HttpHeaders;
  constructor(private http: HttpClient) {
    this.HEADERS = GET_HEADERS();
  }

  getUser(email: string) {
    return this.http.get<GET_USER_RESPONSE>(`${this.API_URL}/${email}`, { headers: this.HEADERS });
  }

  addUser(email: string) {
    return this.http.post<ADD_USER_RESPONSE>(this.API_URL, { email }, { headers: this.HEADERS });
  }
}
