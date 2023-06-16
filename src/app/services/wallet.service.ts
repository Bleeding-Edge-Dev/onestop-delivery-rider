import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Env } from '../shared/apiConfig';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  constructor(private http: HttpClient) {}

  getWalletDetails(token: string) {
    token = 'Bearer ' + token;
    return this.http.post(Env.apiUrl + 'getWalletDetails.php', {
      token: token,
    });
  }
  sendAmountRequest(token: string, reqAmount: number) {
    token = 'Bearer ' + token;
    return this.http.post(Env.apiUrl + 'verifyAmountRequest.php', {
      token,
      reqAmount,
    });
  }
  getPendingTransactions(token: string) {
    token = 'Bearer ' + token;
    return this.http.post(Env.apiUrl + 'getPendingTransactions.php', { token });
  }
  getAllTransactions(token: string) {
    token = 'Bearer ' + token;
    return this.http.post(Env.apiUrl + 'getAllTransactions.php', { token });
  }
  getCreditNotes(token: string) {
    token = 'Bearer ' + token;
    return this.http.post(Env.apiUrl + 'getCreditNotes.php', { token });
  }
}
