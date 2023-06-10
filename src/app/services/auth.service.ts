import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { get, remove, set } from "./storage";
import { Router } from "@angular/router";
import { Device } from "@capacitor/device";
import jsSHA from "jssha";
import { Env } from "../shared/apiConfig";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    null
  );

  private apiUrl = Env.apiUrl;
  uuid: string;
  constructor(private http: HttpClient, private router: Router) {
    this.checkLogin();
    this.getuid();
  }


  async checkLogin() {
    const token = await get("token");
    if (token) {
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }
  login(username, password) {
    this.getuid();
    if (this.uuid) {
      var temp = {
        username: username,
        password: password,
        key1: this.uuid,
      };
    } else {
      this.getuid();
      var temp = {
        username: username,
        password: password,
        key1: this.uuid,
      };
    }
    return this.http.post(this.apiUrl + "login.php", temp);
  }
  async logout(token) {
    let fcmToken = await get("fcmToken");
    this.http
      .post(this.apiUrl + "logout.php", {
        token: token,
        fcmToken,
      })
      .subscribe((res) => {});
    await remove("token");
    await remove("fcmToken");
    this.isAuthenticated.next(false);
    this.router.navigateByUrl("/login", { replaceUrl: true });
  }
  async getuid() {
    const info = await Device.getId();
    let shaObj = new jsSHA("SHA-256", "TEXT");
    shaObj.update(info.identifier);
    let h = shaObj.getHash("HEX");
    await set("uuid", h);
    this.uuid = h;
    console.log(this.uuid);
    return h;
  }

  getProfile(token) {
    return this.http.post(this.apiUrl + "getProfile.php", { token: token });
  }
}
