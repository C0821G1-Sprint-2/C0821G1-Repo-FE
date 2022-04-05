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
    path: 'body', component:BodyComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
