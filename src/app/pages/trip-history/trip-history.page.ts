import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { get } from 'src/app/services/storage';
import { DatePipe } from '@angular/common';

import {   LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-trip-history',
  templateUrl: './trip-history.page.html',
  styleUrls: ['./trip-history.page.scss'],
})
export class TripHistoryPage implements OnInit {
  token :string = '';
  selectedValue: string = "daily";
  selectedDate: any = new Date().toISOString();
  todayDate: any = new Date().toISOString();

  tripHistory: any = [];




  constructor(
    private reportService:ReportService,
    private datePipe: DatePipe,
    private router: Router,
    private loadingController: LoadingController
  ) { }


  onSegmentChange() {
    this.tripHistory = [];
    this.selectedDate = new Date().toISOString();
    if (this.selectedValue === 'weekly') {
      const sixDaysAgo = new Date();
      sixDaysAgo.setDate(sixDaysAgo.getDate() - 6);
      this.selectedDate = sixDaysAgo.toISOString();
    }
    this.getData();
  }
  getCurrentDate(): string {
    return this.todayDate;
  }
async doRefresh(event:any){
  this.getData();
  setTimeout(() => {
    event.target.complete();
  }, 500);
}
  getCurrentMonth(): string {
    const currentMonth = new Date().toISOString().split('T')[0].substr(0, 7);
    return currentMonth;
  }
  onDateChange(event?: any) {
    console.log(event);
    this.selectedDate = event.detail.value;

    this.getData();
  }
  changePickerLabel(val?: string) {
    let weeklyStartDate: any = this.datePipe.transform(this.selectedDate, 'MMM d, y', 'en-US');
    if (this.selectedValue === 'monthly') {
      weeklyStartDate = this.datePipe.transform(this.selectedDate, 'MMMM y ', 'en-US');
    }

      const weeklyEndDate: any = this.datePipe.transform(val, 'MMM d, y', 'en-US');
    const element = document.getElementById("date-picker");

    if (element && element.shadowRoot) {
      const targetElement = element.shadowRoot.querySelector("#date-button");
      if (targetElement) {
        targetElement.textContent = weeklyEndDate? (weeklyStartDate + " - " + weeklyEndDate) : (weeklyStartDate);
      }
    }
  }
  getData() {
    const formattedDate: any = this.datePipe.transform(
      this.selectedDate,
      'yyyy/MM/dd'
    );
    if (this.selectedValue === 'daily') {
      this.getTripHistory(formattedDate, formattedDate);
      this.changePickerLabel();
    } else if (this.selectedValue === 'weekly') {
      const endDate: any = this.calculateEndDate(formattedDate);
      const formattedEndDate: any = this.datePipe.transform(endDate, 'yyyy/MM/dd');
      
      this.changePickerLabel(formattedEndDate);
      this.getTripHistory(formattedDate, formattedEndDate);
    } else if (this.selectedValue === 'monthly') {
      const selectedDateObj = new Date(formattedDate);
      const firstDate = new Date(
        selectedDateObj.getFullYear(),
        selectedDateObj.getMonth(),
        1
      );
      const lastDate = new Date(
        selectedDateObj.getFullYear(),
        selectedDateObj.getMonth() + 1,
        0
      );
      const formattedFirstDate: any = this.datePipe.transform(
        firstDate,
        'yyyy/MM/dd'
      );
      const formattedLastDate: any = this.datePipe.transform(
        lastDate,
        'yyyy/MM/dd'
      );
      this.changePickerLabel();
      this.getTripHistory(formattedFirstDate, formattedLastDate);
    }
  }


  calculateEndDate(selectedDate: any): string | null {
    const endDate = new Date(selectedDate);
    endDate.setDate(endDate.getDate() + 6);

    if (endDate > this.todayDate) {
      return this.datePipe.transform(this.todayDate, 'yyyy/MM/dd');
    }

    return this.datePipe.transform(endDate.toISOString(), 'yyyy/MM/dd');
  }



  async ngOnInit() {
    this.token= 'Bearer '+ await get('token');
  }
  
  async ionViewWillEnter(){
   this.getData();
  }

  async getTripHistory(from:string,to:string){
    if(this.token){
      const loadingMOdal = await this.loadingController.create({
        spinner: 'lines-small',
        animated: true,
      });
      await loadingMOdal.present();
      this.reportService.getTripHistory(this.token,from,to).subscribe((res:any)=>{
        console.log(res);
        this.tripHistory = res;
        loadingMOdal.dismiss();
      })
    }
  }

  goToTripDetails(trip:any){
    this.router.navigate(['/tabs/trip-history/trip-details'],{ queryParams: { trip: JSON.stringify(trip) }} );
  

  }
}
