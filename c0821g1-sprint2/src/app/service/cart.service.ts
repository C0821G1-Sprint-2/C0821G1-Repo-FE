import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Payment} from '../model/payment';
import {Cart} from '../model/cart';
import {Address} from '../model/address';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  httpOptions: any;
  totalMoney: number;
  cartList: Cart[] = [];

  API_URL = 'http://localhost:8080';
  constructor(private httpClient: HttpClient) { }
  payment(payment: Payment): Observable<any> {
    console.log(payment);
    return this.httpClient.post<any>(this.API_URL + '/cart/home/payment', payment, this.httpOptions);
  }

  saveNewOrder(total: any): void {
    this.totalMoney = total;
  }
  save(totalMoney: number): Observable<void> {
    return this.httpClient.get<void>(this.API_URL + '/cart/save' + totalMoney);
  }
  saveCartListTemp(cartList: Cart[]) {
    this.cartList = cartList;
  }
  getCartList( ) {
    return this.cartList;
  }
  getList(): Observable<Address[]> {
    return this.httpClient.get<Address[]>(this.API_URL + '/cart/address');
  }
}
