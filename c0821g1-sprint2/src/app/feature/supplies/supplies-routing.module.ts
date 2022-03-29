import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SuppliesComponent} from "./supplies/supplies.component";


const routes: Routes = [
  {
    path: 'supplies', component: SuppliesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuppliesRoutingModule { }
