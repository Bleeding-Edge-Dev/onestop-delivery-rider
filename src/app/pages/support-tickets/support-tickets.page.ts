import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RatingService } from 'src/app/services/rating.service';
import { get } from 'src/app/services/storage';

@Component({
  selector: 'app-support-tickets',
  templateUrl: './support-tickets.page.html',
  styleUrls: ['./support-tickets.page.scss'],
})
export class SupportTicketsPage implements OnInit {
  tickets: any = [];
  token :string = '';
  ticketsInterval :any;
  constructor(
    private router: Router,
    private RatingService: RatingService

  ) { }

  async ngOnInit() {
    this.token = 'Bearer ' + await get('token');

    this.getTickets()
  }
  async getTickets() {
    this.RatingService.getTicket(this.token).subscribe((res: any) => {
      this.tickets = res;
    })
  }
  doRefresh(event:any) {
    this.getTickets()
    setTimeout(() => {
      event.target.complete();
    }, 200);
  }
 
  async ionWillEnter() {
    this.ticketsInterval = setInterval(() => {
      this.getTickets()
    }, 1000)
  }
  ionWillLeave() {
    clearInterval(this.ticketsInterval)
  }
}
