import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Env } from '../shared/apiConfig';

@Injectable({
  providedIn: 'root',
})
export class PocketService {
  constructor(private http: HttpClient) {}

  getPocketInfo(token: any) {
    return this.http.post(Env.apiUrl + 'getPocketInfo.php', { token: token });
  }
}
