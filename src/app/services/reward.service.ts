import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Env } from "../shared/apiConfig";

@Injectable({
  providedIn: 'root'
})
export class RewardService {

  constructor(private http: HttpClient) {}

  getReward(token){
    return this.http.post(Env.apiUrl + "getRewardInfo.php", { token: token });
  }

  getPayoutData(token,fromData, toDate){
    return this.http.post(Env.apiUrl + "riderReport.php", { token: token, from: fromData, to: toDate });
  }
}
