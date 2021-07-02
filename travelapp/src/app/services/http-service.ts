import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getHttp(url, cbSuccessFn, cbFailureFn) {
    return this.http.get(url)
      .subscribe(cbSuccessFn, cbFailureFn);
  }
}
