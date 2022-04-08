import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Supplies} from "../../../model/supplies";
import {SuppliesService} from "../../../service/supplies.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import * as XLSX from 'xlsx';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
// @ts-ignore
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
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
  flagerroe: boolean = false;
  message: string;
  date: FormGroup;
  checkDate: boolean = false;
  title = 'chartjsangular';
  flagLanhOk: boolean = false;
  flagPagination: boolean = false;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DataLabelsPlugin
  ];

  public barChartData: ChartData<'bar'> = {
    labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ],
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A' },
      { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B' }
    ]
  };

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    this.barChartData.datasets[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.round(Math.random() * 100),
      56,
      Math.round(Math.random() * 100),
      40 ];


  }

  constructor(private suppliesService: SuppliesService, private fb: FormBuilder) {
    this.date = this.fb.group({
      endDay: '',
      startDay: ''
    });

    if (this.date.controls.startDay.value == '' || this.date.controls.endDay.value == '') {
      this.flagLanhOk = true;
    }

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
    if (this.date.controls.startDay.value != '' && this.date.controls.endDay.value != '') {
      this.suppliesService.search(this.page, this.date.controls.startDay.value,
        this.date.controls.endDay.value).subscribe(data => {

        if (data != null) {
          this.flagPagination = true;
          console.log('Lanh oi la Lanh' + this.flagPagination)

          this.supplies = data.content;
          this.totalPages = data.totalPages;
          this.size = data.size;
          this.page = data.pageable.pageNumber;
          this.message = '';
        } else {
          console.log('Lanh oi la Lanh' + this.flagPagination)
          this.flagPagination = false;
          this.message = 'không tìm thấy !'
        }
      })
    }
  }
  submitDate(start: any, end: any) {

    this.suppliesService.check(start, end).subscribe(data => {
      if (data == true) {
        this.flagPagination = false;
      }
      data ? this.checkDate = true : this.checkDate = false;
    })

    this.date.controls.startDay.value != '' && this.date.controls.endDay.value != '' ?
      this.flagLanhOk = false : this.flagLanhOk = true;

    if (start == '' || end == '') {
      this.flagPagination = false;
      return this.flagerroe = true;
    }
    this.flagerroe = false;

    if (start != '' && end != '') {
      this.suppliesService.search(this.page, start, end).subscribe(data => {
        if (data != null) {
          this.flagPagination = true;
          this.supplies = data.content;
          this.totalPages = data.totalPages;
          this.size = data.size;
          this.page = data.pageable.pageNumber;
          this.message = '';
        } else {
          this.flagPagination = false;
          this.message = 'không tìm thấy !'
        }
      }, error => {
        this.message = 'không tìm thấy !'
      })
    } else {
      this.suppliesService.search(this.page, '', '').subscribe(data => {
        if (data != null) {
          this.flagPagination = true;

          this.supplies = data.content;
          this.totalPages = data.totalPages;
          this.size = data.size;
          this.page = data.pageable.pageNumber;
          this.message = '';
        } else {
          this.flagPagination = false;

          this.message = 'không tìm thấy !'
        }
      })
    }
  }

  export() {
    /* pass here the table id */
    // let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
