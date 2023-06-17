import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.page.html',
  styleUrls: ['./trip-details.page.scss'],
})
export class TripDetailsPage implements OnInit {
  trip: any;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      const trip = JSON.parse(params.get('trip') as string);
      if (trip) {
        this.trip = trip;
      } else {
        this.router.navigate(['/tabs/trip-history']);
      }
    });
  }
}
