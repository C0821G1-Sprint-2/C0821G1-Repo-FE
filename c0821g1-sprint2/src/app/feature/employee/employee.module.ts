import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EmployeeCreateComponent} from './employee-create/employee-create.component';
import {EmployeeEditComponent} from './employee-edit/employee-edit.component';
import {EmployeeListComponent} from './employee-list/employee-list.component';
import {EmployeeDeleteComponent} from './employee-delete/employee-delete.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxSpinnerModule} from "ngx-bootstrap-spinner";
import {EmployeeRoutingModule} from "./employee-routing.module";


@NgModule({
  declarations: [EmployeeCreateComponent, EmployeeEditComponent, EmployeeListComponent, EmployeeDeleteComponent],
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
