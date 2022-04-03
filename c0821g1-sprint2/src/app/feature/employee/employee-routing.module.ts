import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmployeeListComponent} from './employee-list/employee-list.component';
import {AuthGuard} from '../../helpers/auth.guard';


const routes: Routes = [
  {
    path: 'list',
    component: EmployeeListComponent, canActivate: [AuthGuard],
    data: {expectedRole: ['ROLE_ADMIN']}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
