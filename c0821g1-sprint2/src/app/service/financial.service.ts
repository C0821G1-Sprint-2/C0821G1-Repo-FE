import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FinancialService {
  API_URL = 'http://localhost:8080/financial';
  constructor(private http: HttpClient) {
  }
  search(page: number, month: string, year: string): Observable<any> {
    return this.http.get(this.API_URL + '/search?month=' + month + '&year='
      + year + '&page=' + page);
  }
}
