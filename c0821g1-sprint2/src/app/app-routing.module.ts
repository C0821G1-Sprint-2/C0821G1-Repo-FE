import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EquipmentListBodyComponent} from './feature/equipment/equipment-list-body/equipment-list-body.component';


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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
