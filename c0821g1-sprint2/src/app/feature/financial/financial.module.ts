import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinancialRoutingModule } from './financial-routing.module';
import { FinancialComponent } from './financial/financial.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [FinancialComponent],
  imports: [
    CommonModule,
    FinancialRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FinancialModule { }
