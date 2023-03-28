import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Env } from '../shared/apiConfig';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(private http: HttpClient) {}
  getRewardInfo(token) {
    //token = "Bearer "+token;
    return this.http.post(Env.apiUrl + "getRewardInfo.php", { token: token });
  }
  request(token,points){
    return this.http.post(Env.apiUrl + "requestReward.php", { token,points });
  }
  getList(token){
    return this.http.post(Env.apiUrl + "rewardList.php", { token });
  }
  getRewardReport(token){
    return this.http.post(Env.apiUrl + "getRewardReport.php", { token });
  }
}
