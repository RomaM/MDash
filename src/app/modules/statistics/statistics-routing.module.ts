import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StatisticsComponent} from './statistics.component';
import {ChartsComponent} from './charts/charts.component';

const routes: Routes = [
  {path: '', component: StatisticsComponent,
    children: [
      {path: '', component: ChartsComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class StatisticsRoutingModule {}
