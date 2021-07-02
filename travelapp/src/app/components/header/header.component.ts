import { Component, OnInit } from '@angular/core';

interface DatasourceObj {
  timer: string;
  intervalValue: any;
}

interface FlagsObj {
  displayOfferExpired: boolean;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  datasource = {} as DatasourceObj;
  flags = {} as FlagsObj;

  constructor() { }

  ngOnInit() {
    this.onInitializeDefaultDetails();
  }

  onInitializeDefaultDetails() {
    this.datasource.timer = '0d 0h 0m 0s';
    this.flags.displayOfferExpired = false;
    this.getTimer();

    // Invoking Every Second to reduce the count down
    this.datasource.intervalValue = setInterval(() => {
      this.getTimer();
    }, 1000);
  }

  getTimer() {
    const now = new Date().getTime();
    const countDownEndDate = new Date('July 10, 2021 18:00:00').getTime();
    const differencedate = countDownEndDate - now;

    const days = Math.floor(differencedate / (1000 * 60 * 60 * 24));
    const hours = Math.floor((differencedate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((differencedate % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((differencedate % (1000 * 60)) / 1000);

    this.datasource.timer = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';

    if (differencedate < 0) {
      clearInterval(this.datasource.intervalValue);
      this.flags.displayOfferExpired = true;
    }
  }

}
