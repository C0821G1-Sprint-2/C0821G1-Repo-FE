import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EquipmentDetailComponent} from './equipment-detail/equipment-detail.component';
import {EquipmentCreateComponent} from './equipment-create/equipment-create.component';
import {EquipmentEditComponent} from './equipment-edit/equipment-edit.component';
import {EquipmentListComponent} from './equipment-list/equipment-list.component';
import {AuthGuard} from '../../helpers/auth.guard';



const routes: Routes = [
  {
    path: 'detail/:id', component: EquipmentDetailComponent,
    canActivate: [AuthGuard],
    data: {expectedRole: ['ROLE_ADMIN', 'ROLE_EMPLOYEE']}
  },
  // {
  //   path: 'list', component: EquipmentListComponent
  // },
  {
    path: 'create', component: EquipmentCreateComponent,
    canActivate: [AuthGuard],
    data: {expectedRole: ['ROLE_ADMIN', 'ROLE_EMPLOYEE']}
  },
  {
    path: 'edit/:id', component: EquipmentEditComponent,
    canActivate: [AuthGuard],
    data: {expectedRole: ['ROLE_ADMIN', 'ROLE_EMPLOYEE']}
  },
  {
    path: 'list', component: EquipmentListComponent,
    canActivate: [AuthGuard],
    data: {expectedRole: ['ROLE_ADMIN', 'ROLE_EMPLOYEE']}
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipmentRoutingModule { }
