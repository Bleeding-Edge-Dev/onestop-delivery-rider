import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Env } from '../shared/apiConfig';

@Injectable({
  providedIn: 'root',
})
export class RewardService {
  constructor(private http: HttpClient) {}

  getReward(token: string) {
    return this.http.post(Env.apiUrl + 'getRewardInfo.php', { token: token });
  }

  getPayoutData(token: string, fromData: any, toDate: any) {
    return this.http.post(Env.apiUrl + 'riderReport.php', {
      token: token,
      from: fromData,
      to: toDate,
    });
  }
}
