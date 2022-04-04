import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuppliesRoutingModule } from './supplies-routing.module';
import { SuppliesComponent } from './supplies/supplies.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [SuppliesComponent],
    imports: [
        CommonModule,
        SuppliesRoutingModule,
        ReactiveFormsModule
    ]
})
export class SuppliesModule { }
