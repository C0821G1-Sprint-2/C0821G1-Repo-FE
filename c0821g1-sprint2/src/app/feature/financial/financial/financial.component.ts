import {Component, OnInit,ViewChild, ElementRef} from '@angular/core';
import {Financial} from "../../../model/financial";
import {FinancialService} from "../../../service/financial.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import * as XLSX from "xlsx";
import {Chart} from "../../../../assets/chart.js";
@Component({
  selector: 'app-financial',
  templateUrl: './financial.component.html',
  styleUrls: ['./financial.component.css']
})
export class FinancialComponent implements OnInit {
  @ViewChild('table') table: ElementRef;
  fileName = 'Financial.xlsx';

  title = 'chartjsangular';
  canvas: any;
  ctx: any;

  financial: Financial[];
  month: string = '';
  year: string = '';
  page = 0;
  totalPages: number;
  pageNumber: number;
  size = 0;
  flag = false;
  message: string;
  revenue: number = 0;
  sell: number = 0;
  manufacture: number = 0;
  importGoods: number = 0;
  payCustomer: number = 0;
  cancel: number = 0;
  date: FormGroup;
  flagg: boolean;
  totalExpenditure: number = 0;
  totalRevenue: number = 0;
  constructor(private financialService: FinancialService, private fb: FormBuilder) {
    this.flagg = false;
    this.date = this.fb.group(
      {
        month: '',
        year: ''
      }
    )
  }
  ngOnInit() {
    if (this.month == '' && this.year == '') {
      this.flag = false;
      this.financialService.search(this.page, this.date.controls.month.value, this.date.controls.year.value).subscribe(data => {
        if (data != null) {
          this.financial = data.content;
          for (let i = 0; i < this.financial.length; i++) {
            this.revenue = this.financial[i].revenue;
            this.sell = this.financial[i].sell;
            this.manufacture = this.financial[i].manufacture;
            this.importGoods = this.financial[i].importGoods;
            this.payCustomer = this.financial[i].payCustomer;
            this.cancel = this.financial[i].cancel;
            this.totalExpenditure = this.financial[i].totalExpenditure;
            this.totalRevenue = this.revenue - this.totalExpenditure;
          }
          this.totalPages = data.totalPages;
          this.size = data.size;
          this.page = data.pageable.pageNumber;
          this.message = '';
        } else {
          this.message = 'không tìm thấy !!!  ';
        }
      })
    }

    // chart

  }


  code() {
    this.month = this.date.controls.month.value;
    this.year = this.date.controls.year.value;
    if (this.month != '' && this.year != '') {
      this.financialService.search(this.page, this.month, this.year).subscribe(data => {
        if (data != null) {
          this.flagg = false;

          this.financial = data.content;

          for (let i = 0; i < this.financial.length; i++) {
            // this.revenue = 0;
            this.revenue = this.financial[i].revenue;
            this.sell = this.financial[i].sell;
            this.manufacture = this.financial[i].manufacture;
            this.importGoods = this.financial[i].importGoods;
            this.payCustomer = this.financial[i].payCustomer;
            this.cancel = this.financial[i].cancel;
            this.totalExpenditure = this.financial[i].totalExpenditure;
            this.totalRevenue = this.revenue - this.totalExpenditure;
            console.log('OK')
          }

          this.totalPages = data.totalPages;
          this.size = data.size;
          this.page = data.pageable.pageNumber;
          this.message = '';
        } else {
          this.message = 'không tìm thấy !!!  ';
        }
      }, error => {
        this.flagg = true;
        this.revenue = 0;
        this.sell = 0;
        this.manufacture = 0;
        this.importGoods = 0;
        this.payCustomer = 0;
        this.cancel = 0;
      })
    }
  }

  export() {
    /* pass here the table id */
    // let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(this.table.nativeElement);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
