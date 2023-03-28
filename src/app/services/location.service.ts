import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Env } from '../shared/apiConfig';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }
  setLocation(token,location){
    return this.http.post(Env.apiUrl+'getRiderLocation.php',{token,location})
  }
}
