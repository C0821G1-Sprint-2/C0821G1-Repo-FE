import { Component, OnInit } from '@angular/core';
import {Equipment} from "../../../model/equipment";
import {EquipmentDeleteComponent} from "../equipment-delete/equipment-delete.component";
import {FormBuilder, FormGroup} from "@angular/forms";
import Swal from "sweetalert2";
import {EquipmentService} from '../../../service/equipment.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';


@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.css']
})
export class EquipmentListComponent implements OnInit {
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
  equipment: Equipment[];


  keywordForm: FormGroup;

  constructor(private equipmentService: EquipmentService,
              private dialog: MatDialog,
              private fb: FormBuilder,
              private router: Router) {
      this.keywordForm = this.fb.group({
        keyword: ''
      });
  }

  ngOnInit(): void {
    this.equipmentService.findAllEquipment(this.page, this.keywordForm.controls.keyword.value).subscribe(data => {
      console.log(data);
      if (data === null) {
        this.message = 'Not found !!!';
        console.log(this.message);
      } else {
        this.equipment = data.content;
        this.totalPages = data.totalPages;
        this.pageNumber = data.pageable.pageNumber;
        this.size = data.size;
        this.page = data.pageable.pageNumber;
        this.message = '';
      }
    });
  }

  openDialog(id: number) {
    this.equipmentService.getEquipmentById(id).subscribe(contractData => {
      console.log(contractData);
      const dialogRef = this.dialog.open(EquipmentDeleteComponent, {
        width: '500px',
        data: {contractData},
        disableClose: true
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result == 'delete'){
          this.callToast();
          this.ngOnInit()
        }
      });
    }, error => {
      alert('Vật tư không tồn tại !');
      this.ngOnInit();
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


  searchEquipment(value: any) {
    console.log('hello    ' + value);
    this.keywordForm.controls.keyword.patchValue(value);
    this.ngOnInit();

  }

  editEquipment(id: number){
    this.router.navigate(['/edit/' + id]);
  }

  callToast() {
    Swal.fire({
      position: 'top',
      icon: 'warning',
      title: 'Xóa thành công',
      showConfirmButton: false,
      timer: 2000
    })
  }
}
