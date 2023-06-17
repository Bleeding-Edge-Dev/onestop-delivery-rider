import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { get } from 'src/app/services/storage';
import { DatePipe } from '@angular/common';
import { ViewChild } from '@angular/core';
import {  IonInput } from '@ionic/angular';
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
  @ViewChild(IonInput)
  datetimePicker!: IonInput;
  tripHistory: any = [];
  openDatePicker() {
    this.datetimePicker.setFocus();
  }



  constructor(
    private reportService:ReportService,
    private datePipe: DatePipe,
    private router: Router
  ) { }


  onSegmentChange() {
    this.tripHistory = [];
    this.selectedDate = new Date().toISOString();
    if (this.selectedValue === 'weekly') {
      const sixDaysAgo = new Date();
      sixDaysAgo.setDate(sixDaysAgo.getDate() - 6);
      this.selectedDate = sixDaysAgo.toISOString();
    }
    this.onDateChange();
  }
  getCurrentDate(): string {
    return this.todayDate;
  }

  getCurrentMonth(): string {
    const currentMonth = new Date().toISOString().split('T')[0].substr(0, 7);
    return currentMonth;
  }
  onDateChange() {

    const formattedDate = this.datePipe.transform(
      this.selectedDate,
      'yyyy/MM/dd'
    );
    this.selectedDate = formattedDate;
    if (this.selectedValue === 'daily') {
      this.getTripHistory(this.selectedDate, this.selectedDate);
    } else if (this.selectedValue === 'weekly') {
      const endDate:any = this.calculateEndDate(this.selectedDate);
      const formattedEndDate:any = this.datePipe.transform(endDate, 'yyyy/MM/dd');
      this.getTripHistory(this.selectedDate, formattedEndDate);
    } else if (this.selectedValue === 'monthly') {
      const selectedDateObj = new Date(this.selectedDate);
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
      const formattedFirstDate:any = this.datePipe.transform(
        firstDate,
        'yyyy/MM/dd'
      );
      const formattedLastDate:any = this.datePipe.transform(
        lastDate,
        'yyyy/MM/dd'
      );
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
    this.getTripHistory(this.selectedDate,this.selectedDate);
  }

  getTripHistory(from:string,to:string){
    if(this.token){
      this.reportService.getTripHistory(this.token,from,to).subscribe((res:any)=>{
        console.log(res);
        this.tripHistory = res;
      })
    }
  }

  goToTripDetails(trip:any){
    this.router.navigate(['/tabs/trip-history/trip-details'],{ queryParams: { trip: JSON.stringify(trip) }} );
  

  }
}
