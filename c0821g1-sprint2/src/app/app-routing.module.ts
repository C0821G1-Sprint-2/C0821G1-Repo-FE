import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EquipmentListBodyComponent} from './feature/equipment/equipment-list-body/equipment-list-body.component';
import {BodyComponent} from "./shared/body/body.component";


const routes: Routes = [
  {
    path: 'cart',
    loadChildren: () => import('./feature/cart/cart.module').then(module => module.CartModule)
  },
  {
    path: 'equipment',
    loadChildren: () => import('./feature/equipment/equipment.module').then(module => module.EquipmentModule)
  }
  ,
  {
    // path: 'payment/:total',
    path: 'payment/:total',
    loadChildren: () => import('./feature/payment/payment.module').then(module => module.PaymentModule)
  },
  {

    path: 'appuser',
    loadChildren: () => import('./feature/appuser/appuser.module').then(module => module.AppuserModule)
  },
  {
    path: 'security',
    loadChildren: () => import('./feature/security/security.module').then(module => module.SecurityModule)
  },
  {
    path: 'employee',
    loadChildren: () => import('./feature/employee/employee.module').then(module => module.EmployeeModule)
  },
  {
    path: 'financial',
    loadChildren: () => import('./feature/financial/financial.module').then(module => module.FinancialModule)
  },
  {
    path: 'supplies',
    loadChildren: () => import('./feature/supplies/supplies.module').then(module => module.SuppliesModule)
  }, {
    path: '',
    component: EquipmentListBodyComponent
  },
  {
    path: 'customer',
    loadChildren: () => import('./feature/customer/customer.module').then(module => module.CustomerModule)
  }
  , {
    // path: employee,
    path: 'employee',
    loadChildren: () => import('./feature/employee/employee.module').then(module => module.EmployeeModule)
  },
  {
    path: 'body', component: BodyComponent
  },
  {
    path: '', component: BodyComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
