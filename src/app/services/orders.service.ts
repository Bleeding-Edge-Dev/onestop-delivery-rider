import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Env } from "../shared/apiConfig";
import { get } from "./storage";

@Injectable({
  providedIn: "root",
})
export class OrdersService {
  private apiUrl = Env.apiUrl;
  constructor(private http: HttpClient) {}

  getOngoingOrders(token) {
    return this.http.post(this.apiUrl + "ordersV2.php", { token: token });
  }

  getCompletedOrders(token) {
    return this.http.post(this.apiUrl + "allorders.php", { token: token });
  }

  firstAction(num, action, token, msg?: any) {
    let pack = {
      action: action,
      id: num,
      token: token,
      msg: msg,
    };
    return this.http.post(this.apiUrl + "actionsV2.php", pack);
  }
  getOrder(token, id) {
    return this.http.post(this.apiUrl + "getOrder.php", { token: token, id: id });
  }
}
