import { Component, OnInit } from '@angular/core';
import {Equipment} from '../../../model/equipment';
import {EquipmentService} from '../../../service/equipment.service';

@Component({
  selector: 'app-equipment-detail',
  templateUrl: './equipment-detail.component.html',
  styleUrls: ['./equipment-detail.component.css']
})
export class EquipmentDetailComponent implements OnInit {

  equipment: Equipment;
  id: number;

  constructor(private equipmentService: EquipmentService) {
  }
  ngOnInit(): void {
    this.id = 1;
    this.equipmentService.findById(this.id).subscribe(value => {
      this.equipment = value;
    }, error => {
    }, () => {
    });
  }
}
