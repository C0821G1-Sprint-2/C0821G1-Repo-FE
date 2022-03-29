import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


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
    path: 'customer',
    loadChildren: () => import('./feature/customer/customer.module').then(module => module.CustomerModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
