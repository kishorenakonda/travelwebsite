import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../app/services/http-service';

interface DatasourceObj {
  weatherList: Array<WeatherObj>;
  errorMessage: string;
  colorMapper: Array<string>;
}

interface WeatherObj {
  city: string;
  temp_Celsius: number;
  temp_Fahr: number;
  bgColor: string;
}

interface FlagsObj {
  displaySuccessContent: boolean;
  displayErrorMessage: boolean;
}

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  datasource = {} as DatasourceObj;
  flags = {} as FlagsObj;

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.getFlagsStatus();
    this.getDefaultDetails();
  }

  getFlagsStatus() {
    this.flags.displayErrorMessage = false;
    this.flags.displaySuccessContent = false;
  }

  getDefaultDetails() {

    this.getWeatherList();
  }

  getWeatherList() {
    const url = 'https://run.mocky.io/v3/e3ae9d2e-78f5-403d-b6cd-fa7f8c7e1576';
    this.httpService.getHttp(
      url,
      (response) => {
        if (response && response.result && response.result.length > 0) {
          this.datasource.weatherList = response.result;
          const colorCodeList = ['#0D7E88', '#D09378', '#405B5D', '#74A748'];
          this.datasource.weatherList.forEach((weatherObj, weatherIndex) => {
            weatherObj.bgColor = colorCodeList[weatherIndex];
          });

          this.flags.displaySuccessContent = true;
        } else {
          this.datasource.weatherList = [];
          this.flags.displayErrorMessage = true;
          this.datasource.errorMessage = 'Error in Fetching Weather Channel Details';
        }
      },
      (error) => {
        console.error('<-- Error in Fetching Weather List -->', error);
        this.flags.displayErrorMessage = true;
        this.datasource.errorMessage = 'Error in Fetching Weather Channel Details';
      }
    );
  }
}
