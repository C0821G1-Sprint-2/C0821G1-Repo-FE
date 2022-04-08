import {Component, OnInit,ViewChild, ElementRef} from '@angular/core';
import {Financial} from "../../../model/financial";
import {FinancialService} from "../../../service/financial.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import * as XLSX from "xlsx";

@Component({
  selector: 'app-financial',
  templateUrl: './financial.component.html',
  styleUrls: ['./financial.component.css']
})
export class FinancialComponent implements OnInit {
  public data: Object[];
  public chartTilte: string;
  public chartLabel: Object;
  public legend: Object;
  public tooltipSettings: Object;

  public title: string;
  @ViewChild('table') table: ElementRef;
  fileName = 'Financial.xlsx';
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
   flagChart = true;
  constructor(private financialService: FinancialService, private fb: FormBuilder) {
    this.flagg = false;
    this.date = this.fb.group(
      {
        month: '',
        year: ''
      }
    )

    if (this.revenue == 0){
      this.flagChart = false;
    }

    // chart
    this.chartTilte = 'Fruits Chart';
    this.data = [
      { name : 'Tổng thu' , value: this.revenue },
      { name : 'Tổng chi' , value: this.totalExpenditure },
      { name : 'Doanh thu' , value: this.totalRevenue }
    ];
    console.log("aaaaaaaa" + this.revenue);
    this.chartLabel = {
      visible : true,
      position: 'Inside',
      name: 'text'
    };
    this.legend = {
      visible: true,
      position: 'Bottom',
      height: '8%',
      width: '35%'
    };
    this.tooltipSettings = {
      enable: true,
      format: '${point.x} : <b>${point.y}%</b>'
    }
  }

  chart123(){
    // chart

    if (this.revenue != 0){
      console.log('Lanh LV')
      this.flagChart = true;
    }else {
      this.flagChart = false;

    }

    this.chartTilte = 'Thông kê tài chính';
    this.data = [
      { name : 'Tổng thu' , value: this.revenue },
      { name : 'Tổng chi' , value: this.totalExpenditure },
      { name : 'Doanh thu' , value: this.totalRevenue }
    ];
    console.log("aaaaaaaa" + this.revenue);
    this.chartLabel = {
      visible : true,
      position: 'Inside',
      name: 'text'
    };
    this.legend = {
      visible: true,
      position: 'Bottom',
      height: '8%',
      width: '35%'
    };
    this.tooltipSettings = {
      enable: true,
      format: '${point.x} : <b>${point.y}%</b>'
    }
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

            this.chart123()
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

          this.chart123()
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
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName);
  }
}
