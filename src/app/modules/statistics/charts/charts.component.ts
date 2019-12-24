import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChartDataSets, ChartType} from 'chart.js';
import {Color, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip} from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import {ChartOptions, brandsOptions, systemOptions} from './chart.options';
import {Subscription} from 'rxjs';
import {ItemsService} from '../../../shared/services/items.service';
import {filter, skipWhile} from 'rxjs/operators';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit, OnDestroy {
  pagesLoadedSubscription: Subscription;
  pagesData: any = [];

  brandsChartOptions: ChartOptions;
  brandsChartLabels: Label[];
  brandsChartData: number[];
  brandsChartType: ChartType;
  brandsChartLegend;
  brandsChartPlugins;
  brandsChartColors;

  /* System Chart */
  systemChartOptions: ChartOptions;
  systemChartLabels: Label[];
  systemChartType: ChartType;
  systemChartLegend;
  systemChartPlugins;
  systemChartColors: Color[];

  systemChartData: ChartDataSets[];

  constructor(private itemsService: ItemsService) {

  }

  ngOnInit() {
    this.pagesLoadedSubscription = this.itemsService.loadedData
      .pipe(
        filter(data => !!data.length)
      )
      .subscribe(
        (data: any) => {
          console.log(data);
          this.pagesData = data;
        }
      );


    const brandsData = {
      brandsChartLabels: ['TradeLTD', 'TradeFW', 'RCPro'],
      brandsChartData: [39, 12, 67]
    };


    this.chartsInit(brandsData);
  }

  chartsInit(brandsData) {
    /* Brands Chart */
    this.brandsChartOptions = brandsOptions;
    this.brandsChartLabels = brandsData.brandsChartLabels;
    this.brandsChartData = brandsData.brandsChartData;
    this.brandsChartType = 'pie';
    this.brandsChartLegend = true;
    this.brandsChartPlugins = [pluginDataLabels];
    this.brandsChartColors = [
      {
        backgroundColor:
          ['rgba(110, 0, 255, .7)', 'rgba(1, 182, 11, .7)', 'rgba(220, 0, 90, .7)', 'rgba(35,96,220,0.7)', 'rgba(69,74,26,0.7)'],
        borderWidth: 0,
        borderColor: '#303030',
      }
    ];

    /* System Chart */
    this.systemChartOptions = systemOptions;
    this.systemChartLabels = ['1.2019', '2.2019', '3.2019', '4.2019', '5.2019', '6.2019', '7.2019', '8.2019', '9.2019'];
    this.systemChartType = 'bar';
    this.systemChartLegend = true;
    this.systemChartPlugins = [pluginDataLabels];
    this.systemChartColors = [
      {backgroundColor: 'rgba(220, 0, 90, .7)'},
      {backgroundColor: 'rgba(110, 0, 255, .7)'},
      {backgroundColor: 'rgba(35,96,220,0.7)'},
      {backgroundColor: 'rgba(69,74,26,0.7)'},
    ];

    this.systemChartData = [
      { data: [65, 59, 80, 81, 56, 55, 33, 28, 58], label: 'NFS' },
      { data: [28, 48, 40, 19, 86, 27, 88, 49, 64], label: 'Promotions' }
    ];
  }

  ngOnDestroy() {
    this.pagesLoadedSubscription.unsubscribe();
  }

}
