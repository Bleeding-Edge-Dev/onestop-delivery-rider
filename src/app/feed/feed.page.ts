import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  isRiderOnline: boolean = false;
  constructor() { }

  ngOnInit() {
  }
  toggleRiderOnline(){
    this.isRiderOnline = !this.isRiderOnline;
  }

}
