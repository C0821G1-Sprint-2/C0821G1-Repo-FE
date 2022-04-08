import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SuppliesComponent} from "./supplies/supplies.component";
import {AuthGuard} from '../../helpers/auth.guard';


const routes: Routes = [
  {
    path: 'list', component: SuppliesComponent,canActivate: [AuthGuard],
    data: {expectedRole: ['ROLE_ADMIN', 'ROLE_EMPLOYEE']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliesRoutingModule { }
