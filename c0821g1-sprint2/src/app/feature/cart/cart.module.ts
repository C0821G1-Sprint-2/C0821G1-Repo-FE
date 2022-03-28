import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartListComponent } from './cart-list/cart-list.component';
import { CartDeleteComponent } from './cart-delete/cart-delete.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [CartListComponent, CartDeleteComponent],
    imports: [
        CommonModule,
        CartRoutingModule,
        FormsModule
    ]
})
export class CartModule { }
