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
  totalMoney: number;
  cartList: Cart[] = [];
  API_URL = 'http://localhost:8080';
  constructor(private httpClient: HttpClient) { }
  payment(payment: Payment): Observable<any> {
    console.log(payment);
    return this.httpClient.post<any>(this.API_URL + '/cart/home/payment', payment);
  }
  saveCartListTemp(cartList: Cart[]) {
    this.cartList = cartList;
  }
  getCartList( ) {
    return this.cartList;
  }
  getListAddress(): Observable<Address[]> {
    return this.httpClient.get<Address[]>(this.API_URL + '/cart/address');
  }

  save(cart: Cart) {
    return this.httpClient.post<any>(this.API_URL + '/cart/create', cart);
  }
}
