import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Env } from "../shared/apiConfig";
import { get } from "./storage";

@Injectable({
  providedIn: "root",
})
export class ReportService {
  constructor(private http: HttpClient) {}
  getTotals(token) {

    return this.http.post(Env.apiUrl + "reports.php", { token: token });
  }
  getTripHistory(token,from,to) {

    return this.http.post(Env.apiUrl + "getTripHistory.php", { token: token,from:from,to:to });
    
  }
}
