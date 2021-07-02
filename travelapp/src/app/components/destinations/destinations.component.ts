import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../app/services/http-service';

interface DatasourceObj {
  destinationList: Array<{ city: string, imageUrl: string }>;
  errorMessage: string;
}

interface FlagsObj {
  displaySuccessContent: boolean;
  displayErrorMessage: boolean;
}

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.css']
})
export class DestinationsComponent implements OnInit {

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
    this.fetchDestinationList();
  }

  fetchDestinationList() {
    const url = 'https://run.mocky.io/v3/3e6901dd-9a60-4771-a8cb-9c62177a654c';
    this.httpService.getHttp(
      url,
      (response) => {
        if (response && response.result && response.result.length > 0) {
          this.datasource.destinationList = response.result;

          this.flags.displaySuccessContent = true;
        } else {
          this.datasource.destinationList = [];
          this.flags.displayErrorMessage = true;
          this.datasource.errorMessage = 'Error in Fetching Destinations';
        }
      },
      (error) => {
        console.error('<-- Error in Fetching Destination List -->', error);
        this.flags.displayErrorMessage = true;
        this.datasource.errorMessage = 'Error in Fetching Destinations';
      }
    );
  }
}
