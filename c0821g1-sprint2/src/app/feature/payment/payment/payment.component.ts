import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Cart} from '../../../model/cart';
import {FormControl, FormGroup} from '@angular/forms';
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
        this.paymentTs();
      },
      onError: err => {
      }
    })
      .render(this.paypalElement.nativeElement);
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
        // this.router.navigateByUrl('/cart/list');
        // this.callToastEmail();
        alert('OK method');
        // this.cartService.save(this.total).subscribe(value1 => {
        //   this.callToastEmail();
        // });
      },
      error => {
        // this.callToastEmail();
        alert('lỗi method');
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
  // openDialog(floorId: number) {
  //   this.floorService.findById(floorId).subscribe(value => {
  //       const dialogRef = this.dialogDelete.open(FloorsDeleteComponent, {
  //         width: '500px',
  //         data: {value},
  //         disableClose: true
  //       });
  //       dialogRef.afterClosed().subscribe(value1 => {
  //         this.ngOnInit();
  //       });
  //     },
  //     error => {
  //       this.callToastFail();
  //     });
  // }
  private callToastEmail() {
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Bạn đã thanh toán thành công. Vui lòng kiểm tra email để xem hóa đơn chi tiết !',
      showConfirmButton: false,
      timer: 2000
    });
  }
}
