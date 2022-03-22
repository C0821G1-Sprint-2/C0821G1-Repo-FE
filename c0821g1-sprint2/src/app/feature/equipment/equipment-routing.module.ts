import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EquipmentDetailComponent} from './equipment-detail/equipment-detail.component';


const routes: Routes = [
  {
    path: 'detail', component: EquipmentDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipmentRoutingModule { }
