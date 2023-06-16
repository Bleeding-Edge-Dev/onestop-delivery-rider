import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Env } from '../shared/apiConfig';
import { get } from './storage';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private http: HttpClient) {}
  getTotals(token: any) {
    //token = "Bearer "+token;
    return this.http.post(Env.apiUrl + 'reports.php', { token: token });
  }
}
