import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EquipmentDetailComponent} from './equipment-detail/equipment-detail.component';
import {EquipmentListComponent} from "./equipment-list/equipment-list.component";


const routes: Routes = [
  {
    path: 'detail', component: EquipmentDetailComponent
  },
  {
    path: 'list-equipment', component:EquipmentListComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipmentRoutingModule { }
