import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartListComponent } from './cart-list/cart-list.component';
import { CartDeleteComponent } from './cart-delete/cart-delete.component';


@NgModule({
  declarations: [CartListComponent, CartDeleteComponent],
  imports: [
    CommonModule,
    CartRoutingModule
  ]
})
export class CartModule { }
