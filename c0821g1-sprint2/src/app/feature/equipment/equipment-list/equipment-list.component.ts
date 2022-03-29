import { Component, OnInit } from '@angular/core';
import {Equipment} from '../../../model/equipment';
import {EquipmentService} from '../../../service/equipment.service';

@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.css']
})
export class EquipmentListComponent implements OnInit {
  equipmentList: Equipment[];
  constructor(private equipmentService: EquipmentService ) {
    this.equipmentService.findAll().subscribe(value => {
      this.equipmentList = value;
      console.log(value);
    });
  }

  ngOnInit(): void {
  }

}
