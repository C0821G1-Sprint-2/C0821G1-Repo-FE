import { Component, OnInit } from '@angular/core';

import {Customer} from '../../../model/customer';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CustomerService} from '../../../service/customer.service';
import {CustomerDeleteComponent} from '../customer-delete/customer-delete.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  page = 0;
  name = '';
  code = '';
  start = '';
  end = '';
  totalPages: number;
  pageNumber: number;
  size = 0;
  flagSearch = false;
  message: string;
  customer: Customer[];
  keywordForm: FormGroup;

  constructor(private customerService: CustomerService,
              private fb: FormBuilder, private dialog: MatDialog) {
    this.keywordForm = this.fb.group({
      keyword: ''
    });
  }

  ngOnInit() {

    this.customerService.findAllCustomer(this.page, this.keywordForm.controls.keyword.value).subscribe(data => {
      if (data === null) {
        this.message = 'Not found !!!';
        console.log(this.message);
      } else {
        this.customer = data.content;
        this.totalPages = data.totalPages;
        this.pageNumber = data.pageable.pageNumber;
        this.size = data.size;
        this.page = data.pageable.pageNumber;
        this.message = '';
      }
    });
  }

  previousClick(index) {
    this.page = this.page - index;
    console.log('pre pay ' + this.page + '/' + this.totalPages + 'search:' + this.flagSearch);
    this.ngOnInit();
  }

  nextClick(index) {
    this.page = this.page + index;
    console.log('next pay ' + this.page + '/' + this.totalPages + 'search:' + this.flagSearch);
    this.ngOnInit();
  }

  findPaginnation(value: number) {
    this.page = value - 1;
    this.ngOnInit();
  }

  searchCustomer(value: any) {
    console.log('hello    ' + value);
    this.keywordForm.controls.keyword.patchValue(value);
    if (this.keywordForm.controls.keyword.value){
      this.ngOnInit();
    } else {
      this.ngOnInit();
    }
  }

  openDialog(id: number) {
    this.customerService.getCustomerById(id).subscribe(contractData => {
      console.log(contractData);
      const dialogRef = this.dialog.open(CustomerDeleteComponent, {
        width: '300px',
        data: {contractData},
        disableClose: true
      });
      dialogRef.afterClosed().subscribe(result => {
        // tslint:disable-next-line:triple-equals
        if (result == 'delete'){
          this.ngOnInit();
        }
      });
    }, error => {
      alert('Vật tư không tồn tại !');
      this.ngOnInit();
    });
  }
}
