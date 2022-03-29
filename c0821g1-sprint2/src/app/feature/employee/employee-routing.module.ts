import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmployeeListComponent} from './employee-list/employee-list.component';
import {EmployeeChangePasswordComponent} from './employee-change-password/employee-change-password.component';


const routes: Routes = [
  {path: 'list', component: EmployeeListComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    declarations: [
        EmployeeChangePasswordComponent
    ],
    exports: [RouterModule, EmployeeChangePasswordComponent]
})
export class EmployeeRoutingModule { }
