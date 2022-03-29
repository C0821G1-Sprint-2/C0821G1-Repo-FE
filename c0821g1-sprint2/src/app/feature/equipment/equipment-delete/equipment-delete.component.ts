import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EquipmentService} from "../../../service/equipment.service";
import {Equipment} from "../../../model/equipment";

@Component({
  selector: 'app-equipment-delete',
  templateUrl: './equipment-delete.component.html',
  styleUrls: ['./equipment-delete.component.css']
})
export class EquipmentDeleteComponent implements OnInit {

  equipment:Equipment;
  constructor(public  dialogRef: MatDialogRef<EquipmentDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private equipmentService: EquipmentService) { }

  ngOnInit(): void {
    this.equipment = this.data.contractData;
  }

  deleteContract(){
    console.log(this.equipment.id);
    this.equipmentService.deleteEquipment(this.equipment.id).subscribe(date => {
      this.dialogRef.close('delete');
    });
  }

}
