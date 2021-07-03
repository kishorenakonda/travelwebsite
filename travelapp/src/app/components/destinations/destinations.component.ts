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
    this.fetchDestinationList();
  }

  getFlagsStatus() {
    this.flags.displayErrorMessage = false;
    this.flags.displaySuccessContent = false;
  }

  fetchDestinationList() {
    this.httpService.getHttp(
      'https://run.mocky.io/v3/3e6901dd-9a60-4771-a8cb-9c62177a654c',
      (response) => {
        if (response && response.result && response.result.length > 0) {
          this.datasource.destinationList = response.result;
          this.flags.displaySuccessContent = true;
        } else {
          this.onErrorResponse();
        }
      },
      (error) => {
        console.error('<-- Error in Fetching Destination List -->', error);
        this.onErrorResponse();
      }
    );
  }

  onErrorResponse() {
    this.datasource.destinationList = [];
    this.flags.displayErrorMessage = true;
    this.datasource.errorMessage = 'Error in Fetching Destinations';
  }
}
