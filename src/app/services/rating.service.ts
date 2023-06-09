import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  uuid: string;
  constructor(private http: HttpClient, 
    private back: HttpBackend, private httpOg: HttpClient, 
    private httpOld: HttpClient) {
    this.http = new HttpClient(back);
  }
  raiseTicket(token,orderId,issue,contact,image,imagename){
    
    token = 'Bearer '+token;
    const formData = new FormData();
    formData.append('file',image);
    formData.append('token',token);
    formData.append('orderId',orderId);
    formData.append('issue',issue);
    formData.append('contact',contact);
    formData.append('type','1');
    formData.append('imagename',imagename)

    return this.httpOld.post("https://onestopdelivery.in/api/riderApp/api/raiseTicket.php",formData);
  }
  getTicket(token){
    token = 'Bearer '+token;
    return this.httpOld.post('https://onestopdelivery.in/api/riderApp/api/getTickets.php',{token});
  }

}
