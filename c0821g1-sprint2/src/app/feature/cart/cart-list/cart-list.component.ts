import { Component, OnInit } from '@angular/core';
import {Cart} from '../../../model/cart';
import {Router} from '@angular/router';
import {EquipmentService} from '../../../service/equipment.service';
import {CartService} from '../../../service/cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {

  constructor(
    private equipmentService: EquipmentService,
    private router: Router,
    private cartService: CartService
  ) {
    this.getCartList();
  }
  quantity: number [] = [];
  cartList: Cart[] = [];
  // totalMoney = 0;
  totalMoney = 0;
  idDeleteCart = 0;
  nameDeleteCart = '';
  p = 1;
  message: string;
  suppliesIdList: string[] = [];
  numberOfSupplies = 0;
  getCartList() {
    this.suppliesIdList = Object.keys(localStorage);
    this.getQuantity();
    // tslint:disable-next-line:prefer-for-of
    // for (let i = 0; i < this.suppliesIdList.length; i++) {
    //     //   this.equipmentService.findById(Number(this.suppliesIdList[i])).subscribe(
    //     //     value => {
    //     //       const cart = new Cart();
    //     //       cart.id = value.id;
    //     //       cart.code = value.code;
    //     //       // cart.totalMoney = value.totalMoney;
    //     //       // cart.equipment.image = value.equipment.image;
    //     //       console.log(localStorage.getItem(String(cart.id)));
    //     //       cart.quantity = Number(localStorage.getItem(String(cart.id)));
    //     //       this.cartList.push(cart);
    //     //       // this.getTotalMoney(cart.id, cart.quantity);
    //     //     });
    //     // }
    this.equipmentService.findById(1).subscribe(
      value => {
        const cart = new Cart();
        cart.id = value.id;
        cart.code = value.code;
        cart.totalMoney = value.price;
        // cart.equipment.image = value.image;
        console.log(localStorage.getItem(String(cart.id)));
        cart.quantity = Number(localStorage.getItem(String(cart.id)));
        this.cartList.push(cart);
        console.log(this.cartList);
        this.getTotalMoney(cart.id, cart.quantity);
      });
  }

  getQuantity() {
    for (let i = 0; i < 15; i++) {
      this.quantity.push(i);
    }
  }
  ngOnInit(): void {
  }


  getTotalMoney(id: number, quantity: number) {
    // @ts-ignore
    localStorage.setItem(String(id), String(quantity));
    this.totalMoney = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.cartList.length; i++) {
      this.totalMoney += this.cartList[i].quantity * this.cartList[i].totalMoney;
    }
  }

  moveToPaymentPage() {
    this.cartService.saveCartListTemp(this.cartList);
  }

  deleteCart(id: number) {
    localStorage.removeItem(String(id));
    this.router.navigateByUrl('').then(e => {
      if (e) {
        this.router.navigateByUrl('/cart/list');
      }
    });
  }

  addIdToDelete(id: number, name: string) {
    this.idDeleteCart = id;
    this.nameDeleteCart = name;
  }
  // newMessage() {
  //   this.suppliesIdList = Object.keys(localStorage);
  //   this.numberOfSupplies = this.suppliesIdList.length;
  //   this.data.changeMessage('' + this.numberOfSupplies);
  // }

}
