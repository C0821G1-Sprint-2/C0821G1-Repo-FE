import { Component, OnInit } from '@angular/core';
import {Equipment} from '../../../model/equipment';
import {EquipmentService} from '../../../service/equipment.service';

@Component({
  selector: 'app-equipment-list-body',
  templateUrl: './equipment-list-body.component.html',
  styleUrls: ['./equipment-list-body.component.css']
})
export class EquipmentListBodyComponent implements OnInit {

  equipmentList: Equipment[];
  page = 0;
  equipmentTypeId = '';
  totalPages: number;
  pageNumber: number;
  size = 0;
  flag = false;
  message: string;

  constructor(private equipmentService: EquipmentService) { }

  ngOnInit(): void {
    this.equipmentService.equipmentListBody(this.page).subscribe(value => {
      console.log(value);
      this.equipmentList = value.content;

      this.totalPages = value.totalPages;
      this.size = value.size;
      this.page = value.pageable.pageNumber;
      this.message = '';
    });

    // console.log('a');
    // if (true) {
    //   this.flag = false;
    //   this.equipmentService.equipmentListBody(this.page)
    //     .subscribe(data => {
    //         console.log('ok' + data);
    //         if (data !== null) {
    //           console.log('h1  ' + data.content);
    //           this.equipmentList = data.content;
    //           console.log(this.equipmentList);
    //           this.totalPages = data.totalPages;
    //           this.size = data.size;
    //           this.page = data.pageable.pageNumber;
    //           this.message = '';
    //         } else {
    //           this.message = 'không tìm thấy !!!  ';
    //         }
    //       }
    //     );
    // } else {
    //   console.log('2');
    //   console.log(this.equipmentTypeId);
    //   if (this.flag === false) {
    //     this.page = 0;
    //     this.equipmentService.equipmentListBody(this.page)
    //       .subscribe(data => {
    //         if (data !== null) {
    //           this.equipmentList = data.content;
    //           this.totalPages = data.totalPages;
    //           this.size = data.size;
    //           this.page = data.pageable.pageNumber;
    //           this.message = '';
    //         } else {
    //           this.message = 'Không tìm thấy nhân viên đó. Yêu cầu bạn nhập lại !!!';
    //           console.log('ggfghgfhghgfhg');
    //
    //         }
    //         this.flag = true;
    //       });
    //   }
    // }

  }


  previousClick(index) {
    this.page = this.page - index;
    this.ngOnInit();
  }

  findPaginnation(value: number) {
    if (value === this.totalPages) {
      this.page = value - 1;
    }
    this.ngOnInit();

  }

  nextClick(index) {
    this.page = this.page + index;
    console.log('next pay ' + this.page);
    this.ngOnInit();
  }
}
