import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EquipmentDetailComponent} from './equipment-detail/equipment-detail.component';
import {EquipmentListComponent} from './equipment-list/equipment-list.component';
import {EquipmentCreateComponent} from './equipment-create/equipment-create.component';
import {EquipmentEditComponent} from './equipment-edit/equipment-edit.component';


const routes: Routes = [
  {
    path: 'detail', component: EquipmentDetailComponent
  },
  {
    path: 'list', component: EquipmentListComponent
  },
  {
    path: 'create', component: EquipmentCreateComponent
  },
  {
    path: 'edit/:id', component: EquipmentEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipmentRoutingModule { }
