import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { get } from 'src/app/services/storage';
import { DatePipe } from '@angular/common';

import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-session-history',
  templateUrl: './session-history.page.html',
  styleUrls: ['./session-history.page.scss'],
})
export class SessionHistoryPage implements OnInit {
  sessionInterval: any = null;
  token = '';
  selectedDate: string = new Date().toISOString();

  sessionHistory: any[] = [];

  constructor(
    private reportService: ReportService,
    private datePipe: DatePipe,
    private router: Router,
    public loadingController: LoadingController
  ) {}

  getCurrentDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  onDateChange(event?: Event) {
    this.selectedDate = (event?.target as HTMLInputElement).value;
    this.getSessionhistory();
  }

  onIonViewWillEnter() {
    this.sessionInterval = setInterval(() => {
      this.getSessionhistory();
    }, 1000);
  }

  doRefresh(event: any) {
    this.getSessionhistory();
    setTimeout(() => {
      event.target.complete();
    }, 200);
  }

  onIonViewWillLeave() {
    clearInterval(this.sessionInterval);
  }

  async ngOnInit() {
    this.token = 'Bearer ' + (await get('token'));
    this.getSessionhistory();
  }

  async getSessionhistory() {
    this.sessionHistory = [];
    const loadingMOdal = await this.loadingController.create({
      spinner: 'lines-small',
      animated: true,
    });
    await loadingMOdal.present();
    const formattedDate: any = this.datePipe.transform(this.selectedDate, 'yyyy/MM/dd');
    if (this.token) {
      this.reportService.getSessionHistory(this.token, formattedDate, formattedDate).subscribe(
        (res: any) => {
          console.log(res);
          this.sessionHistory = res.map((session: any) => ({
            ...session,
            timeRange: this.convertTimeRange(session.timeRange)
          }));
          loadingMOdal.dismiss()
        },
        (err) => {
          console.log(err);
          loadingMOdal.dismiss()
        },

      );
    }
  }

  convertTimeRange(timeRange: string): string {
    const [startTime, endTime] = timeRange.split(' - ');

    const startDate = new Date(Date.parse(startTime.trim()));
    const formattedStartTime = startDate.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    let formattedEndTime = '';

    if (endTime.trim() === 'Still Active') {
      formattedEndTime = 'Still Active';
    } else {
      const endDate = new Date(Date.parse(endTime.trim()));
      formattedEndTime = endDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
    }

    return `${formattedStartTime} - ${formattedEndTime}`;
  }

  ionViewWillEnter() {
    this.getSessionhistory();
  }
}
