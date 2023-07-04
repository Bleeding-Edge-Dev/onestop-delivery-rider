import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Env } from "../shared/apiConfig";
import { BehaviorSubject } from "rxjs";
import { get } from "./storage";
import { AuthService } from "./auth.service";
@Injectable({
  providedIn: "root",
})
export class StatusService {
  isRiderOnline: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );


  constructor(private http: HttpClient,
    private authservice:AuthService) {
    this.authservice.isAuthenticated$.subscribe((res) => {
      if (res) {
        this.checkRiderOnline();
      }
    })

  }

    async checkRiderOnline() {
      let token = await get("token");
      token = "Bearer " + token;
      if (token) {
        this.getStatus(token).subscribe((res: any) => {
          if (res.active == "1") {
            this.isRiderOnline.next(true);
          } else {
            this.isRiderOnline.next(false);
          }
        })
      }
    }

  getStatus(token:string) {
    return this.http.post(Env.apiUrl + "active.php", { token: token });
  }
  setStatus(token:string, checked:any) {
    let newValue;
    if (checked) {
      newValue = "ON";
    } else {
      newValue = "OFF";
    }

    return this.http.post(Env.apiUrl + "setActive.php", {
      token: token,
      active: newValue,
    });
  }
}
