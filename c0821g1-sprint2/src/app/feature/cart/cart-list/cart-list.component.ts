import { Component, OnInit } from '@angular/core';
import {Cart} from '../../../model/cart';
import {Router} from '@angular/router';
import {EquipmentService} from '../../../service/equipment.service';
import {CartService} from '../../../service/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {
  idDeleteCart = 0;
  nameDeleteCart = '';
  constructor(private equipmentService: EquipmentService, private router: Router, private cartService: CartService) {
    this.getCartList();
  }

  cartList: Cart[] = [];
  totalMoneyAll = 0 ;
  suppliesIdList: string[] = [];

  getCartList() {
    this.suppliesIdList = Object.keys(localStorage);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.suppliesIdList.length; i++) {
      this.equipmentService.findById(Number(1)).subscribe(
        value => {
          const cart = new Cart();
          cart.id = value.id;
          cart.code = value.code;
          cart.totalMoney = Number(value.price);
          cart.image = value.image;
          cart.quantity = Number(localStorage.getItem(String(cart.id)));
          this.cartList.push(cart);
          this.getTotalMoney(cart.id, cart.quantity);
        });
    }
  }

  ngOnInit(): void {
  }
  getTotalMoney(id: number, quantity: number) {
    // @ts-ignore
    localStorage.setItem(String(id), String(quantity));
    this.totalMoneyAll = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.cartList.length; i++) {
      this.totalMoneyAll += this.cartList[i].quantity * this.cartList[i].totalMoney;
    }
  }
  moveToPaymentPage() {
    this.cartService.saveCartListTemp(this.cartList);
  }

  addIdToDelete(id: number, code: string) {
    this.idDeleteCart = id;
    this.nameDeleteCart = code;
  }

  deleteCart(id: number) {
    localStorage.removeItem(String(id));
    this.router.navigateByUrl('').then(e => {
      if (e) {
        this.router.navigateByUrl('/cart/list');
        this.callToastDelete();
      }
    });
  }
  private callToastDelete() {
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Xóa đơn hàng thành công !',
      showConfirmButton: false,
      timer: 2000
    });
  }
}
