  import { Component, OnInit } from '@angular/core';
import {Equipment} from '../../../model/equipment';
import {EquipmentService} from '../../../service/equipment.service';
  import {FormBuilder, FormGroup} from "@angular/forms";

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
  bodyForm: FormGroup;

  constructor(private equipmentService: EquipmentService, private fb: FormBuilder) {
    this.bodyForm = this.fb.group({
      keyword: ''
    })
  }



  ngOnInit(): void {
    if (this.equipmentTypeId === '') {
      this.flag = false;
      this.equipmentService.findAllEquipment(this.page, this.equipmentTypeId)
        .subscribe(data => {
            console.log('ok' + data);
            if (data !== null) {
              console.log('h1  ' + data.content);
              this.equipmentList = data.content;
              console.log(this.equipmentList);
              this.totalPages = data.totalPages;
              this.size = data.size;
              this.page = data.pageable.pageNumber;
              this.message = '';
            } else {
              this.message = 'không tìm thấy !!!  ';
            }
          }
        );
    } else {
      console.log('2');
      console.log(this.equipmentTypeId);
      if (this.flag === false) {
        // this.page = 0;
        this.equipmentService.findAllEquipment(this.page, this.equipmentTypeId)
          .subscribe(data => {
            if (data !== null) {
              this.equipmentList = data.content;
              this.totalPages = data.totalPages;
              this.size = data.size;
              this.page = data.pageable.pageNumber;
              this.message = '';
            } else {
              this.message = 'Không tìm thấy nhân viên đó. Yêu cầu bạn nhập lại !!!';
              console.log('ggfghgfhghgfhg');

            }
            this.flag = true;
          });
      }
    }

  }


  previousClick(index) {
    this.page = this.page - index;
    this.ngOnInit();
  }

  findPaginnation(value: any) {
    if (value === this.totalPages) {
      this.page = value - 1;
      console.log(this.page);
    }
    this.ngOnInit();

  }

  nextClick(index) {
    this.page = this.page + index;
    console.log('next pay ' + this.page);
    this.ngOnInit();
  }

  search() {
    if (this.equipmentTypeId === '') {
      this.flag = false;
      this.equipmentService.findAllEquipment(this.page, this.equipmentTypeId)
        .subscribe(data => {
            console.log('ok' + data);
            if (data !== null) {
              console.log('h1  ' + data.content);
              this.equipmentList = data.content;
              console.log(this.equipmentList);
              this.totalPages = data.totalPages;
              this.size = data.size;
              this.page = data.pageable.pageNumber;
              this.message = '';
            } else {
              this.message = 'không tìm thấy !!!  ';
            }
          }
        );
    } else {
      console.log('2');
      console.log(this.equipmentTypeId);
      if (this.flag === false) {
        this.page = 0;
        this.equipmentService.findAllEquipment(this.page, this.equipmentTypeId)
          .subscribe(data => {
            if (data !== null) {
              this.equipmentList = data.content;
              this.totalPages = data.totalPages;
              this.size = data.size;
              this.page = data.pageable.pageNumber;
              this.message = '';
            } else {
              this.message = 'Không tìm thấy nhân viên đó. Yêu cầu bạn nhập lại !!!';
              console.log('ggfghgfhghgfhg');

            }
            this.flag = true;
          });
      }
    }
  }

  onSubmit() {
    this.search();
  }

  timkiem(value: any) {
    console.log(value)
    this.equipmentService.findAllEquipment(this.page,value)
      .subscribe(data => {
          console.log('ok' + data);
          if (data !== null) {
            console.log('h1  ' + data.content);
            this.equipmentList = data.content;

            for (let i = 0; i < this.equipmentList.length; i++) {
              console.log(
                this.equipmentList[i].name
              )
            }

            console.log(this.equipmentList);
            this.totalPages = data.totalPages;
            this.size = data.size;
            this.page = data.pageable.pageNumber;
            this.message = '';
          } else {
            this.message = 'không tìm thấy !!!  ';
          }
        }
      );
  }
}
