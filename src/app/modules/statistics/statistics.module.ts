import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoreModule} from '../../core/core.module';
import {SharedModule} from '../../shared/shared.module';
import {StatisticsComponent} from './statistics.component';
import { ChartsComponent } from './charts/charts.component';
import { DetailsComponent } from './details/details.component';
import {ChartsModule} from 'ng2-charts';
import {StatisticsRoutingModule} from './statistics-routing.module';

@NgModule({
  declarations: [
    StatisticsComponent,
    ChartsComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    ChartsModule,
    StatisticsRoutingModule
  ]
})

export class StatisticsModule {}
