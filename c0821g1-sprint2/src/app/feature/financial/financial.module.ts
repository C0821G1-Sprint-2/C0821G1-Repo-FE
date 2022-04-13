import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinancialRoutingModule } from './financial-routing.module';
import { FinancialComponent } from './financial/financial.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  AccumulationChartModule,
  AccumulationDataLabelService, AccumulationTooltipService,
  FunnelSeriesService,
  AccumulationLegendService, PieSeriesService
} from "@syncfusion/ej2-angular-charts";


@NgModule({
  declarations: [FinancialComponent],
    imports: [
        CommonModule,
        FinancialRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        AccumulationChartModule
    ],
  providers: [
    PieSeriesService,
    AccumulationLegendService,
    AccumulationDataLabelService,
    AccumulationTooltipService,
    FunnelSeriesService
  ]
})
export class FinancialModule { }
