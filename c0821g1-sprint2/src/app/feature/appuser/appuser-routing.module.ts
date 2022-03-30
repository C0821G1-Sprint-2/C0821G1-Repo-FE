import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppuserCreateAccountComponent} from './appuser-create-account/appuser-create-account.component';
import {AuthGuard} from '../../helpers/auth.guard';


const routes: Routes = [
  {
    path: 'create',
    component: AppuserCreateAccountComponent,
    canActivate: [AuthGuard],
    data: {expectedRole: ['ROLE_ADMIN', 'ROLE_EMPLOYEE']}
},
]
;

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppuserRoutingModule {
}
