import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EquipmentRoutingModule} from './equipment-routing.module';
import {EquipmentCreateComponent} from './equipment-create/equipment-create.component';
import {EquipmentEditComponent} from './equipment-edit/equipment-edit.component';
import {EquipmentDetailComponent} from './equipment-detail/equipment-detail.component';
import {EquipmentDeleteComponent} from './equipment-delete/equipment-delete.component';
import {EquipmentListComponent} from './equipment-list/equipment-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
// @ts-ignore
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment.prod';
import {EquipmentListBodyComponent} from './equipment-list-body/equipment-list-body.component';
import {MatDialogModule} from '@angular/material/dialog';
import {NgxSpinnerModule} from 'ngx-bootstrap-spinner';


@NgModule({
  declarations: [EquipmentCreateComponent
    , EquipmentEditComponent, EquipmentDetailComponent
    , EquipmentDeleteComponent, EquipmentListComponent,EquipmentListBodyComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    EquipmentRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    RouterModule,
    MatDialogModule,
    NgxSpinnerModule,

  ]
})

export class EquipmentModule {
}
