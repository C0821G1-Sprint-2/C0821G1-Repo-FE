import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EquipmentDetailComponent} from './equipment-detail/equipment-detail.component';
import {EquipmentListComponent} from './equipment-list/equipment-list.component';
import {EquipmentCreateComponent} from './equipment-create/equipment-create.component';


const routes: Routes = [
  {
    path: 'detail', component: EquipmentDetailComponent
  },
  {
    path: 'list', component: EquipmentListComponent
  },
  {
    path: 'create', component: EquipmentCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipmentRoutingModule { }
