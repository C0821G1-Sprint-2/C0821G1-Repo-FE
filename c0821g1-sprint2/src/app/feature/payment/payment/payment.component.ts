import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Cart} from '../../../model/cart';
import {FormControl, FormGroup} from '@angular/forms';
import Swal from 'sweetalert2';
import {CartService} from '../../../service/cart.service';
import {CustomerTransfer} from '../../../model/customer-transfer';
import {Address} from '../../../model/address';

declare var paypal;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(private router: Router, private cartService: CartService, private activatedRoute: ActivatedRoute,) {
    this.cartList = this.cartService.getCartList();
    this.getTotalMoney();
    this.cartService.getList().subscribe(
      value => {
        this.addressList = value;
      },
      error => {
        console.log(error);
      }
    );
  }

  get name() {
    return this.customerForm.get('name');
  }

  get email() {
    return this.customerForm.get('email');
  }

  get address() {
    return this.customerForm.get('address');
  }

  get phone() {
    return this.customerForm.get('phone');
  }

  @ViewChild('paypal', {static: true}) paypalElement: ElementRef;
  cartList: Cart[] = [];
  customerTransfer: CustomerTransfer;
  paidFor = false;
  total: number;
  flag: boolean;
  addressList: Address[] = [];
  customerForm: FormGroup = new FormGroup({
    name: new FormControl(),
    phone: new FormControl(),
    email: new FormControl(),
    address: new FormControl(),
  });
  ngOnInit(): void {
    paypal.Buttons({
      onApprove: async (data, actions) => {
        const order = await actions.order.capture();
        this.paidFor = true;
        // @ts-ignore
        this.payment();
        this.router.navigateByUrl('');
        this.callToastFail();
      },
      onError: err => {
      }
    })
      .render(this.paypalElement.nativeElement);
  }

  checkPaypal() {
    this.flag = !this.flag;
  }
  payment() {
    this.customerTransfer = this.customerForm.value;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.addressList.length ; i++) {
      // @ts-ignore
      if ( this.addressList[i].name === this.customerTransfer.address ) {
        this.customerTransfer.address = this.addressList[i];
        console.log(this.customerTransfer);
        break;
      }
    }
    // @ts-ignore
    const pay = new Payment( this.cartList, this.customerTransfer );
    this.cartService.payment(pay).subscribe(
      value => {
        localStorage.clear();
        // tslint:disable-next-line:no-unused-expression
        this.callToastEmail();
        this.cartService.saveNewOrder(this.total);
        this.cartService.save(this.total).subscribe();
        this.callToastFail();
      },
      error => {
      }
    );
  }

  clickTC() {
  this.callToastFail();
  }
  getTotalMoney() {
    this.total = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.cartList.length; i++) {
      this.total += this.cartList[i].quantity * this.cartList[i].totalMoney;
    }
  }
  private callToastFail() {
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Check email !',
      showConfirmButton: false,
      timer: 2000
    });
  }

  private callToastEmail() {
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Bạn đã đặt hàng thành công, Vui lòng kiểm tra email!',
      showConfirmButton: false,
      timer: 2000
    });
  }
}
