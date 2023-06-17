import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-network-failure-modal',
  templateUrl: './network-failure-modal.component.html',
  styleUrls: ['./network-failure-modal.component.scss'],
})
export class NetworkFailureModalComponent  {
  networkStatus: boolean = true ;

  ngOnInit() {
    this.networkStatus = navigator.onLine; // Initial network status

    window.addEventListener('online', this.onNetworkOnline.bind(this));
    window.addEventListener('offline', this.onNetworkOffline.bind(this));
  }

  onNetworkOnline() {
    this.networkStatus = true;
  }

  onNetworkOffline() {
    this.networkStatus = false;
  }

  retry() {
    // Implement your retry logic here
    // For example, you can reload the current page or retry an API call
    location.reload();
  }
}
