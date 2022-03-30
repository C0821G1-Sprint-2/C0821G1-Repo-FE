import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  API_URL = 'http://localhost:8080';
  constructor(private httpClient: HttpClient) { }


  findAllCustomer(page, customer): Observable<any> {
    return this.httpClient.get(this.API_URL + '/customer/customer-list/?page=' + page + '&keyword=' + customer);
  }

  getCustomerById(id): Observable<any> {
    return this.httpClient.get(this.API_URL + '/customer/' + id);
  }

  delete(id): Observable<any> {
    return this.httpClient.delete(this.API_URL + '/customer/delete/' + id);
  }
}
