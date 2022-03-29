import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EquipmentRoutingModule} from './equipment-routing.module';
import {EquipmentCreateComponent} from './equipment-create/equipment-create.component';
import {EquipmentEditComponent} from './equipment-edit/equipment-edit.component';
import {EquipmentDetailComponent} from './equipment-detail/equipment-detail.component';
import {EquipmentDeleteComponent} from './equipment-delete/equipment-delete.component';
import {EquipmentListComponent} from './equipment-list/equipment-list.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment.prod';


@NgModule({
  declarations: [EquipmentCreateComponent, EquipmentEditComponent, EquipmentDetailComponent, EquipmentDeleteComponent, EquipmentListComponent],
  imports: [
    CommonModule,
    EquipmentRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ]
})
export class EquipmentModule {
}
