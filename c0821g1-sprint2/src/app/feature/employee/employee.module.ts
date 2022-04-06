import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EmployeeRoutingModule} from './employee-routing.module';
import {EmployeeCreateComponent} from './employee-create/employee-create.component';
import {EmployeeEditComponent} from './employee-edit/employee-edit.component';
import {EmployeeListComponent} from './employee-list/employee-list.component';
import {EmployeeDeleteComponent} from './employee-delete/employee-delete.component';



@NgModule({
  declarations: [EmployeeCreateComponent, EmployeeEditComponent, EmployeeListComponent, EmployeeDeleteComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule
  ]

import {EmployeeCreateAcountComponent} from './employee-create-acount/employee-create-acount.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {NgxSpinnerModule} from 'ngx-bootstrap-spinner';


@NgModule({
  declarations: [EmployeeCreateComponent, EmployeeEditComponent, EmployeeListComponent, EmployeeDeleteComponent, EmployeeCreateAcountComponent],
  exports: [
    EmployeeDeleteComponent,
    EmployeeCreateComponent,
    EmployeeListComponent,
    EmployeeEditComponent
  ],
    imports: [
        CommonModule,
        EmployeeRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        NgxSpinnerModule
    ]

})
export class EmployeeModule {
}
