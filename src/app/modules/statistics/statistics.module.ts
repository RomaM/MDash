import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoreModule} from '../../core/core.module';
import {SharedModule} from '../../shared/shared.module';
import {StatisticsComponent} from './statistics.component';
import { ChartsComponent } from './charts/charts.component';
import { DetailsComponent } from './details/details.component';
import {ChartsModule} from 'ng2-charts';
import {StatisticsRoutingModule} from './statistics-routing.module';
import {StoreModule} from '@ngrx/store';
import {pagesReducer} from '../items/store/pages.reducer';
import {EffectsModule} from '@ngrx/effects';
import {PagesEffects} from '../items/store/pages.effects';

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
    StoreModule.forFeature('pagesState', pagesReducer),
    EffectsModule.forFeature([PagesEffects]),
    StatisticsRoutingModule
  ]
})

export class StatisticsModule {}
