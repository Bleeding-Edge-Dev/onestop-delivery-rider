import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Env } from '../shared/apiConfig';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  constructor(private http: HttpClient) {}
  getStatus(token: any) {
    return this.http.post(Env.apiUrl + 'active.php', { token: token });
  }
  setStatus(token: any, checked: any) {
    let newValue;
    if (checked) {
      newValue = 'ON';
    } else {
      newValue = 'OFF';
    }

    return this.http.post(Env.apiUrl + 'setActive.php', {
      token: token,
      active: newValue,
    });
  }
}
