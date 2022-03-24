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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
