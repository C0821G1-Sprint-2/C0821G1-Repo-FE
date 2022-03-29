import {Component, Inject, OnInit} from '@angular/core';
import {Customer} from "../../../model/customer";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CustomerService} from "../../../service/customer.service";

@Component({
  selector: 'app-customer-delete',
  templateUrl: './customer-delete.component.html',
  styleUrls: ['./customer-delete.component.css']
})
export class CustomerDeleteComponent implements OnInit {

  customer: Customer;

  constructor(public  dialogRef: MatDialogRef<CustomerDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private customerService: CustomerService) { }

  ngOnInit(): void {
    this.customer = this.data.contractData;
  }

  deleteCustomer(){
    console.log(this.customer.id);
    this.customerService.delete(this.customer.id).subscribe(date => {
      this.dialogRef.close('delete');
    });
  }


}
