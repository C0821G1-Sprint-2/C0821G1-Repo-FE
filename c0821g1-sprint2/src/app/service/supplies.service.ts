import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SuppliesService {
  API_URL = 'http://localhost:8080/supplies';

  constructor(private http: HttpClient) {
  }

  search(page: number, startDay: string, endDay: string): Observable<any> {
    return this.http.get(this.API_URL + '/search?startDay=' + startDay + '&endDay='
      + endDay + '&page=' + page);
  }

  check(startDay: string, endDay: string): Observable<any> {
    return this.http.get(this.API_URL + '/check?startDay=' + startDay + '&endDay=' + endDay);
  }
}
