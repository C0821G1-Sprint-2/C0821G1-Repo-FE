import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDeleteComponent } from './employee-delete/employee-delete.component';
import { EmployeeCreateAcountComponent } from './employee-create-acount/employee-create-acount.component';


@NgModule({
  declarations: [EmployeeCreateComponent, EmployeeEditComponent, EmployeeListComponent, EmployeeDeleteComponent, EmployeeCreateAcountComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule
  ]
})
export class EmployeeModule { }
