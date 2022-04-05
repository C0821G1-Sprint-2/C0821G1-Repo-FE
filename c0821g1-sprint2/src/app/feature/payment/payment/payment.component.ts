import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Cart} from '../../../model/cart';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {CartService} from '../../../service/cart.service';
import {CustomerTransfer} from '../../../model/customer-transfer';
import {Address} from '../../../model/address';
import {Payment} from '../../../model/payment';

declare var paypal;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(private router: Router, private cartService: CartService, private activatedRoute: ActivatedRoute) {
    this.cartList = this.cartService.getCartList();
    this.getTotalMoney();
    this.cartService.getListAddress().subscribe(
      value => {
        this.addressList = value;
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
    name: new FormControl('', [Validators.required, this.validateName, Validators.maxLength(50)]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^0(\d){9}$/)]),
    email: new FormControl('', [Validators.required, Validators.maxLength(50),
      Validators.pattern(/^[a-z]+[a-zA-Z0-9.]+@[a-zA-Z0-9.]+(\\.[a-zA-Z0-9]+\\.*[a-zA-Z0-9])*/)]),
    address: new FormControl('', Validators.required),
  });
  ngOnInit(): void {
    paypal.Buttons({
      onApprove: async (data, actions) => {
        const order = await actions.order.capture();
        this.paidFor = true;
        this.paymentTs();
      },
      onError: err => {
      }
    })
      .render(this.paypalElement.nativeElement);
    console.log(this.cartList);
  }

  checkPaypal() {
    this.flag = !this.flag;
  }
  paymentTs() {
    this.customerTransfer = this.customerForm.value;
    // @ts-ignore
    const pay = new Payment(this.cartList, this.customerTransfer);
    this.cartService.payment(pay).subscribe(
      value => {
        localStorage.clear();
        this.router.navigateByUrl('/cart/list');
        this.callToastEmail();
        this.saveCart();
      },
      error => {
        this.callToastFailEmail();
      }
    );
  }
  getTotalMoney() {
    this.total = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.cartList.length; i++) {
      this.total += this.cartList[i].quantity * this.cartList[i].totalMoney;
    }
  }
  saveCart() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.cartList.length; i++) {
      this.cartService.save(this.cartList[i]).subscribe(value1 => {
      });
    }
  }
  validateName(name: AbstractControl) {
    return isValidUnicodeFullName(name.value) ? null : {errorName: true};
  }

  private callToastEmail() {
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Bạn đã thanh toán thành công. Vui lòng kiểm tra email để xem hóa đơn chi tiết !',
      showConfirmButton: false,
      timer: 2000
    });
  }
  private callToastFailEmail() {
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Quá trình thanh toán bị lỗi, bạn vui lòng thử lại sau!',
      showConfirmButton: false,
      timer: 2000
    });
  }
}
function removeAscent(str) {
  if (str === null || str === undefined) {
    return str;
  }
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  return str;
}
function isValidWord(word) {
  // const re = /[_\W]0-9/;
  return /^[a-zA-Z]+$/.test(removeAscent(word));
}
function isValidUnicodeFullName(fullName) {
  const arrName = fullName.split(' ');
  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < arrName.length; i++) {
    if (!isValidWord(arrName[i])) {
      return false;
    }
  }
  return true;
}
