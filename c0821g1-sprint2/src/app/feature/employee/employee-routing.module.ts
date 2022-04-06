
import { NgModule } from '@angular/core';
import {AuthGuard} from '../../helpers/auth.guard';
import {Routes, RouterModule} from '@angular/router';
import {EmployeeCreateComponent} from './employee-create/employee-create.component';
import {EmployeeEditComponent} from './employee-edit/employee-edit.component';
import {EmployeeListComponent} from './employee-list/employee-list.component';



const routes: Routes = [
  {
    path: 'list',
    component: EmployeeListComponent, canActivate: [AuthGuard],
    data: {expectedRole: ['ROLE_ADMIN']}
  },
  {
    path: 'create', component: EmployeeCreateComponent
  },
  {
    path: 'update/:id', component: EmployeeEditComponent
  },
  {
    path: 'list', component: EmployeeListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {
}
