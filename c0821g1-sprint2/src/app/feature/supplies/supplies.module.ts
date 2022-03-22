import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuppliesRoutingModule } from './supplies-routing.module';
import { SuppliesComponent } from './supplies/supplies.component';


@NgModule({
  declarations: [SuppliesComponent],
  imports: [
    CommonModule,
    SuppliesRoutingModule
  ]
})
export class SuppliesModule { }
