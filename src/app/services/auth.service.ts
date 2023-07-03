import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { get, remove, set } from './storage';
import { Router } from '@angular/router';
import { Device } from '@capacitor/device';
import jsSHA from 'jssha';
import { Env } from '../shared/apiConfig';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = Env.apiUrl;
  uuid: string = '';
  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.checkLogin();
    this.getuid();
  }

  async checkSessionStatus(): Promise<boolean> {
    const token = await get('token');
    return !!token;
  }

  async checkLogin() {
    console.log('check');
    const token = await get('token');
    this.isAuthenticatedSubject.next(!!token);
  }

  login(username: string, password: string) {
    this.getuid();
    const temp = {
      username: username,
      password: password,
      key1: this.uuid,
    };
    return this.http.post(this.apiUrl + 'login.php', temp);
  }

  async logout(token: string) {
    const fcmToken = await get('fcmToken');
    this.http
      .post(this.apiUrl + 'logout.php', {
        token: token,
        fcmToken,
      })
      .subscribe((res) => {});
    await remove('token');
    await remove('fcmToken');
    this.isAuthenticatedSubject.next(false);
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

  async getuid() {
    const info = await Device.getId();
    let shaObj = new jsSHA('SHA-256', 'TEXT');
    shaObj.update(info.identifier);
    let h = shaObj.getHash('HEX');
    await set('uuid', h);
    this.uuid = h;
    console.log(this.uuid);
    return h;
  }

  getProfile(token: string) {
    return this.http.post(this.apiUrl + 'getProfile.php', { token: token });
  }
}
