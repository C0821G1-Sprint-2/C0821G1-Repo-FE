// @ts-ignore
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
// import {Chart} from 'chart.js'
import {Supplies} from "../../../model/supplies";
import {SuppliesService} from "../../../service/supplies.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import * as XLSX from 'xlsx';
import {Chart} from "../../../../assets/chart.js";
// @ts-ignore
@Component({
  selector: 'app-supplies',
  templateUrl: './supplies.component.html',
  styleUrls: ['./supplies.component.css']
})
export class SuppliesComponent implements OnInit {
  @ViewChild('table') table: ElementRef;
  fileName = 'Supplies.xlsx';
  supplies: Supplies[];
  page = 0;
  totalPages: number;
  pageNumber: number;
  size = 0;
  flag = false;
  flagerroe:boolean = false;
  message: string;
   date: FormGroup;
   checkDate: boolean = false;
  title = 'chartjsangular';
  constructor(private suppliesService : SuppliesService, private fb: FormBuilder) {
    this.date = this.fb.group({
      endDay : '',
      startDay : ''
    });
// chart

  }
  previousClick(index) {
    this.page = this.page - index;
    this.ngOnInit();
  }

  nextClick(index) {
    console.log('Quá ghê =========================')
    this.page = this.page + index;
    this.ngOnInit();
  }

  findPaginnation(value: number) {
    this.page = value - 1;
    this.ngOnInit();
  }
  ngOnInit() {
    // // @ts-ignore
    // Highcharts.chart('container', this.options);
    // if (this.date.controls.startDay.value === '' && this.date.controls.endDay.value === '') {
    //   this.flag = false;

    if (this.date.controls.startDay.value != '' && this.date.controls.endDay.value != ''){
      this.suppliesService.search(this.page, this.date.controls.startDay.value,
        this.date.controls.endDay.value).subscribe(data => {

        if (data != null) {
          this.supplies = data.content;
          this.totalPages = data.totalPages;
          this.size = data.size;
          this.page = data.pageable.pageNumber;
          this.message = '';
        } else {
          this.message = 'không tìm thấy !'
        }
      })
    }


    // }

  }

  // chart
  canvas: any;
  ctx: any;
  @ViewChild('mychart') mychart:any;

  ngAfterViewInit() {
    this.canvas = this.mychart.nativeElement;
    this.ctx = this.canvas.getContext('2d');

    // @ts-ignore
    new Chart(this.ctx, {
      type: 'line',
      data: {
        datasets: [{
          label: 'imported materials',
          data: [0, 20, 40, 50],
          backgroundColor: "rgb(115 185 243 / 65%)",
          borderColor: "#007ee7",
          fill: true,
        },
          {
            label: 'salable materials',
            data: [0, 20, 70, 80],
            backgroundColor: "rgb(115 185 243 / 65%)",
            borderColor: "red",
            fill: true,
          },
          {
            label: 'inventory materials',
            data: [0, 20, 70, 80],
            backgroundColor: "rgb(115 185 243 / 65%)",
            borderColor: "yellow",
            fill: true,
          },
          {
            label: 'damaged materials',
            data: [0, 20, 70, 80],
            backgroundColor: "rgb(115 185 243 / 65%)",
            borderColor: "Violet",
            fill: true,
          },
          {
            label: 'Invested Amount',
            data: [0, 20, 40, 60, 80],
            backgroundColor: "#47a0e8",
            borderColor: "#007ee7",
            fill: true,
          }],
        labels: ['January 2022', 'imported materials', 'salable materials', 'inventory materials', 'damaged materials']
      },
    });
  }

  submitDate(start: any, end: any) {

    if (start == '' || end == ''){
      return this.flagerroe = true;
    }

    this.flagerroe = false;

    this.suppliesService.check(start,end).subscribe(data=> {
      data ? this.checkDate = true : this.checkDate = false;
    })
      if (start != '' && end != ''){
        this.suppliesService.search(this.page,start,end).subscribe(data => {
          if(data != null){
            this.supplies = data.content;
            this.totalPages = data.totalPages;
            this.size = data.size;
            this.page = data.pageable.pageNumber;
            this.message = '';
          }else {
            this.message = 'không tìm thấy !'
          }
        }, error => {
          this.message = 'không tìm thấy !'
        })
      }else {
        this.suppliesService.search(this.page,'','').subscribe(data => {
          console.log("hello anh Tây" + data)

          if(data != null){
            this.supplies = data.content;
            this.totalPages = data.totalPages;
            this.size = data.size;
            this.page = data.pageable.pageNumber;
            this.message = '';
          }else {
            this.message = 'không tìm thấy !'
          }
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
