import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChartDataSets, ChartType} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import {ChartOptions, brandsOptions, systemOptions} from './chart.options';
import {Subscription} from 'rxjs';
import {ItemsService} from '../../../shared/services/items.service';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit, OnDestroy {
  pagesLoadedSubscription: Subscription;

  pagesToBrands: Array<{brand: string, pageAmount: number}> = [];
  pagesToSystem: Array<{}> = [];

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
    const brandsData = {
      brandsChartLabels: [],
      brandsChartData: []
    };

    const systemData = {
      systemChartLabels: [],
      systemChartData: [
        { data: [], label: ''},
      ]
    };

    this.chartsInit();

    this.pagesLoadedSubscription = this.itemsService.loadedData
      .pipe(
        filter(data => !!data.length)
      )
      .subscribe(
        (data: any) => {
          data.map(el => {
            // Brands data calculation
            if (brandsData.brandsChartLabels.includes(el[1].brand)) {
              brandsData.brandsChartLabels.find((item, index) => {
                if (item === el[1].brand) { brandsData.brandsChartData[index]++; }
              });
            } else {
              brandsData.brandsChartLabels.push(el[1].brand);
              brandsData.brandsChartData.push(1);
            }

            // System data calculation
            const elDate = new Date(el[1].date);
            const elYearMonth = `${elDate.getFullYear()}.${elDate.getMonth() + 1}`;

            console.log(elYearMonth);

            let dateIndex;
            // If system labels include current date, remember its index for chart data binding by index
            if (systemData.systemChartLabels.includes(elYearMonth)) {
              dateIndex = systemData.systemChartLabels.findIndex(item => item === elYearMonth);
            } else {
              systemData.systemChartLabels.push(elYearMonth);
              dateIndex = systemData.systemChartLabels.length - 1;
            }


            // Find system index if it exists
            let systemIndex;
            systemIndex = systemData.systemChartData.findIndex((item) => item.label === el[1].system);

            if (systemIndex >= 0) {
              systemData.systemChartData[systemIndex].data[dateIndex] =
                !systemData.systemChartData[systemIndex].data[dateIndex] ? 1 : +1;
            } else {
              systemData.systemChartData.push({data: [], label: el[1].system});
              systemData.systemChartData[systemData.systemChartData.length - 1].data[dateIndex] = 1;
              // Clear the first empty element
              if (systemData.systemChartData[0].label === '') { systemData.systemChartData.shift(); }
            }
          });

          // Brands data update
          this.brandsChartLabels = brandsData.brandsChartLabels;
          this.brandsChartData = brandsData.brandsChartData;

          // System data update
          this.systemChartLabels = systemData.systemChartLabels;
          this.systemChartData = systemData.systemChartData;

        }
      );

  }

  chartsInit() {
    /* Brands Chart */
    this.brandsChartOptions = brandsOptions;
    this.brandsChartLabels = [];
    this.brandsChartData = [];
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
    this.systemChartType = 'bar';
    this.systemChartLegend = true;
    this.systemChartPlugins = [pluginDataLabels];
    this.systemChartColors = [
      {backgroundColor: 'rgba(220, 0, 90, .7)'},
      {backgroundColor: 'rgba(110, 0, 255, .7)'},
      {backgroundColor: 'rgba(35,96,220,0.7)'},
      {backgroundColor: 'rgba(69,74,26,0.7)'},
    ];

    this.systemChartLabels = [];
    this.systemChartData = [{data: [], label: ''}];
  }

  ngOnDestroy() {
    this.pagesLoadedSubscription.unsubscribe();
  }

}
