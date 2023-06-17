import { Component, OnInit, ViewChild } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { get } from 'src/app/services/storage';
import { DatePipe } from '@angular/common';
import { IonDatetime, IonInput } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-session-history',
  templateUrl: './session-history.page.html',
  styleUrls: ['./session-history.page.scss'],
})
export class SessionHistoryPage implements OnInit {
  sessionInterval: any = null;
  token = '';
  selectedDate: string = new Date().toISOString();
  @ViewChild(IonInput)
  datetimePicker!: IonInput;
  sessionHistory: any[] = [];

  constructor(
    private reportService: ReportService,
    private datePipe: DatePipe,
    private router: Router
  ) {}

  getCurrentDate(): string {
    const todayDate = new Date().toISOString().split('T')[0];
    return todayDate;
  }

  openDatePicker() {
    this.datetimePicker.setFocus();
  }

  onDateChange() {
    const formattedDate = this.datePipe.transform(this.selectedDate, 'yyyy/MM/dd');
    this.selectedDate = formattedDate || '';
    this.getSessionhistory(this.selectedDate, this.selectedDate);
  }

  onIonViewWillEnter() {
    this.sessionInterval = setInterval(() => {
      this.getSessionhistory(this.selectedDate, this.selectedDate);
    }, 1000);
  }

  doRefresh(event: any) {
    this.onDateChange();
    setTimeout(() => {
      event.target.complete();
    }, 200);
  }

  onIonViewWillLeave() {
    clearInterval(this.sessionInterval);
  }

  async ngOnInit() {
    this.token = 'Bearer ' + (await get('token'));
    this.onDateChange();
  }

  async getSessionhistory(from: string, to: string) {
    if (this.token) {
      this.reportService.getSessionHistory(this.token, from, to).subscribe(
        (res: any) => {
          console.log(res);
          this.sessionHistory = res.map((session: any) => {
            // Convert timeRange format for each session
            session.timeRange = this.convertTimeRange(session.timeRange);
            return session;
          });
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  convertTimeRange(timeRange: string): string {
    // Split the time range into start and end times
    const [startTime, endTime] = timeRange.split(' - ');

    // Parse the start time into a Date object
    const startDate = new Date(Date.parse(startTime.trim()));

    // Format the start time
    const formattedStartTime = startDate.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    let formattedEndTime = '';

    // Check if the end time is "Still Active"
    if (endTime.trim() === 'Still Active') {
      formattedEndTime = 'Still Active';
    } else {
      // Parse the end time into a Date object
      const endDate = new Date(Date.parse(endTime.trim()));

      // Format the end time
      formattedEndTime = endDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
    }

    // Combine the formatted start and end times
    const formattedTimeRange = `${formattedStartTime} - ${formattedEndTime}`;

    return formattedTimeRange;
  }
}
