import { Component, OnInit } from '@angular/core';
import {Equipment} from '../../../model/equipment';
import {EquipmentService} from '../../../service/equipment.service';
import Swal from "sweetalert2";
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-equipment-detail',
  templateUrl: './equipment-detail.component.html',
  styleUrls: ['./equipment-detail.component.css']
})
export class EquipmentDetailComponent implements OnInit {
  equipment: Equipment;
  idSupplies: number;
  constructor(private equipmentService: EquipmentService, private activatedRoute: ActivatedRoute) {
    const id = this.activatedRoute.snapshot.params.id;
    this.equipmentService.findById(id).subscribe(value => {
      this.equipment = value;
    }, error => {
    }, () => {
    });
  }
  ngOnInit(): void {
  }
  addToCart() {
    this.idSupplies = 2;
    localStorage.setItem(String(this.idSupplies), String(1));
    this.callToastAdd();
  }
  // moveToPaymentPage(id) {
  //   this.id = id;
  // }

  private callToastAdd() {
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Thêm sản phẩm thành công!',
      showConfirmButton: false,
      timer: 2000
    });
  }
}
