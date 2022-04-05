import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '../../../service/employee.service';
import {Employee} from '../../../model/employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[];
  page = 0;
  totalPages: number;
  pageNumber: number;
  size = 0;
  flag = false;
  checkDeleteFlag = false;
  message: string;
  keyword = '';

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.flag = false;
    this.employeeService.findAllEmployeeByKeyword(this.page,this.keyword).subscribe(value => {
      if (value === null) {
        this.message = 'Not found !!!';
        console.log(this.message);
      } else {
        this.employees = value.content;
        this.totalPages = value.totalPages;
        console.log('totalPage' + this.totalPages);
        this.size = value.size;
        console.log('Size' + this.size);
        this.page = value.pageable.pageNumber;
        console.log('Page' + this.page);
        this.message = '';
        console.log(value);
      }
    });
    // this.employeeService.findAllEmployeeByKeyword(this.page, this.keyword).subscribe(value => {
    //   if (value === null) {
    //     this.message = 'Not found !!!';
    //     console.log(this.message);
    //   } else {
    //     this.employees = value['content'];
    //     this.totalPages = value['totalPages'];
    //     console.log('totalPage' + this.totalPages);
    //     this.size = value['size'];
    //     console.log('Size' + this.size);
    //     this.page = value['pageable']['pageNumber'];
    //     console.log('Page' + this.page);
    //     this.message = '';
    //     console.log(value);
    //   }
    // });
  }
  previousClick(index) {
    this.page = this.page - index;
    this.ngOnInit();
  }

  nextClick(index) {
    this.page = this.page + index;
    console.log('------------>' + this.page);
    this.ngOnInit();
  }

  findPaginnation(value: number) {
    this.page = value - 1;
    this.ngOnInit();
  }

}
