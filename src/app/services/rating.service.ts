import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Device } from "@capacitor/device";
import jsSHA from 'jssha';
import { set } from './storage';
@Injectable({
  providedIn: 'root'
})
export class RatingService {
  uuid: string='';
  constructor(private http: HttpClient,
    private back: HttpBackend, private httpOg: HttpClient,
    private httpOld: HttpClient) {
    this.http = new HttpClient(back);
  }
  raiseTicket(token:string, orderId:string, issue:string, contact:any, image:any, imagename:any) {
    token = 'Bearer ' + token;

    const formData = new FormData();
    formData.append('file', image);
    formData.append('token', token);
    formData.append('orderId', orderId);
    formData.append('issue', issue);
    formData.append('contact', contact);
    formData.append('type', '1');
formData.append('imagename', imagename)

    return this.httpOld.post("https://onestopdelivery.in/api/riderApp/api/raiseTicket.php", formData);
  }
  getTicket(token:string) {

    return this.httpOld.post('https://onestopdelivery.in/api/riderApp/api/getTickets.php', { token });
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

}
