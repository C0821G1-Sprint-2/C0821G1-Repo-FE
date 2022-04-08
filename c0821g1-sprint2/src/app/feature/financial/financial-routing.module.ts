import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FinancialComponent} from "./financial/financial.component";
import {AuthGuard} from '../../helpers/auth.guard';


const routes: Routes = [
  {
    path: 'list', component: FinancialComponent,
    canActivate: [AuthGuard],
    data: {expectedRole: ['ROLE_ADMIN', 'ROLE_EMPLOYEE']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancialRoutingModule { }
