import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquipmentRoutingModule } from './equipment-routing.module';
import { EquipmentCreateComponent } from './equipment-create/equipment-create.component';
import { EquipmentEditComponent } from './equipment-edit/equipment-edit.component';
import { EquipmentDetailComponent } from './equipment-detail/equipment-detail.component';
import { EquipmentDeleteComponent } from './equipment-delete/equipment-delete.component';
import { EquipmentListComponent } from './equipment-list/equipment-list.component';
import { EquipmentListBodyComponent } from './equipment-list-body/equipment-list-body.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from "@angular/material/dialog";
import {RouterModule} from "@angular/router";
import {NgxSpinnerModule} from 'ngx-bootstrap-spinner';

@NgModule({
  declarations: [EquipmentCreateComponent, EquipmentEditComponent, EquipmentDetailComponent, EquipmentDeleteComponent, EquipmentListComponent],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        EquipmentRoutingModule,
        RouterModule,
        MatDialogModule,
        NgxSpinnerModule
    ]
})
export class EquipmentModule { }
