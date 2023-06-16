import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Env } from '../shared/apiConfig';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  constructor(private http: HttpClient) {}
  changepassword(token: string, pass: string, npass: string, cpass: string) {
    let pack = {
      token: token,
      currentPassword: pass,
      newPassword: npass,
      confirmPassword: cpass,
    };
    return this.http.post(Env.apiUrl + 'changePassword.php', pack);
  }
}
