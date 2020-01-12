import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChartDataSets, ChartType} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import {barChartOptions, ChartOptions, pieChartOptions} from './chart.options';
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

  chartReady = false;

  /* Brands Chart Properties */
  brandsChartOptions: ChartOptions;
  brandsChartLabels: Label[];
  brandsChartData: number[];
  brandsChartType: ChartType;
  brandsChartLegend;
  brandsChartPlugins;
  brandsChartColors;

  /* Systems Chart Properties */
  systemChartOptions: ChartOptions;
  systemChartLabels: Label[];
  systemChartType: ChartType;
  systemChartLegend;
  systemChartPlugins;
  systemChartColors: Color[];
  systemChartData: ChartDataSets[];

  /* Steps Chart Properties */
  stepsChartOptions: ChartOptions;
  stepsChartLabels: Label[];
  stepsChartType: ChartType;
  stepsChartLegend;
  stepsChartPlugins;
  stepsChartColors: Color[];
  stepsChartData: ChartDataSets[];

  /* Langs Chart Properties */
  langsChartOptions: ChartOptions;
  langsChartLabels: Label[];
  langsChartData: number[];
  langsChartType: ChartType;
  langsChartLegend;
  langsChartPlugins;
  langsChartColors;

  constructor(private itemsService: ItemsService) {

  }

  ngOnInit() {
    const brandsData = {
      labels: [],
      data: []
    };

    const systemData = {
      labels: [],
      dataList: [
        { data: [], label: ''},
      ]
    };

    const langsData = {
      labels: [],
      data: []
    };

    const stepsData = {
      labels: [],
      dataList: [
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
            this.pieChartSelection(brandsData, el[1].brand);

            // Langs data calculation
            this.pieChartSelection(langsData, el[1].lang);

            const elDate = new Date(el[1].date);
            const elYearMonth = `${elDate.getFullYear()}.${elDate.getMonth() + 1}`;
            // System data calculation
            this.barChartSelection(systemData, elYearMonth, el[1].system);

            // Steps data calculation
            this.barChartSelection(stepsData, elYearMonth, el[1].steps);

            // const elDate = new Date(el[1].date);
            // const elYearMonth = `${elDate.getFullYear()}.${elDate.getMonth() + 1}`;
            //
            // let dateIndex;
            // // If system labels include current date, remember its index for chart data binding by index
            // if (systemData.labels.includes(elYearMonth)) {
            //   dateIndex = systemData.labels.findIndex(item => item === elYearMonth);
            // } else {
            //   systemData.labels.push(elYearMonth);
            //   dateIndex = systemData.labels.length - 1;
            // }
            //
            // // Find system index if it exists
            // let systemIndex;
            // systemIndex = systemData.dataList.findIndex((item) => item.label === el[1].system);
            //
            // if (systemIndex >= 0) {
            //   systemData.dataList[systemIndex].data[dateIndex] =
            //     !systemData.dataList[systemIndex].data[dateIndex] ? 1
            //       : systemData.dataList[systemIndex].data[dateIndex] + 1;
            // } else {
            //   systemData.dataList.push({data: [], label: el[1].system});
            //   systemData.dataList[systemData.dataList.length - 1].data[dateIndex] = 1;
            //   // Clear the first empty element
            //   if (systemData.dataList[0].label === '') { systemData.dataList.shift(); }
            // }
          });

          // Brands data update
          this.brandsChartLabels = brandsData.labels;
          this.brandsChartData = brandsData.data;

          // System data update
          this.systemChartLabels = systemData.labels;
          this.systemChartData = systemData.dataList;

          // Steps data update
          this.stepsChartLabels = stepsData.labels;
          this.stepsChartData = stepsData.dataList;

          // Langs data update
          this.langsChartLabels = langsData.labels;
          this.langsChartData = langsData.data;

          this.chartReady = true;
        }
      );

  }

  chartsInit() {
    /* Brands Chart and Lang Chart */
    this.brandsChartOptions = this.langsChartOptions = pieChartOptions;
    this.brandsChartLabels = this.langsChartLabels = [];
    this.brandsChartData = this.langsChartData = [];
    this.brandsChartType = this.langsChartType = 'pie';
    this.brandsChartLegend = this.langsChartLegend = true;
    this.brandsChartPlugins = this.langsChartPlugins = [pluginDataLabels];
    this.brandsChartColors = this.langsChartColors = [
      {
        backgroundColor:
          ['rgba(110, 0, 255, .7)', 'rgba(1, 182, 11, .7)', 'rgba(220, 0, 90, .7)', 'rgba(35,96,220,0.7)', 'rgba(69,74,26,0.7)'],
        borderWidth: 0,
        borderColor: '#303030',
      }
    ];

    /* System Chart and Steps Chart */
    this.systemChartOptions = this.stepsChartOptions = barChartOptions;
    this.systemChartType = this.stepsChartType = 'bar';
    this.systemChartLegend = this.stepsChartLegend = true;
    this.systemChartPlugins = this.stepsChartPlugins = [pluginDataLabels];
    this.systemChartColors = this.stepsChartColors = [
      {backgroundColor: 'rgba(220, 0, 90, .7)'},
      {backgroundColor: 'rgba(110, 0, 255, .7)'},
      {backgroundColor: 'rgba(35,96,220,0.7)'},
      {backgroundColor: 'rgba(69,74,26,0.7)'},
    ];

    this.systemChartLabels = this.stepsChartLabels = [];
    this.systemChartData = this.stepsChartData = [{data: [], label: ''}];
  }

  pieChartSelection(sourceObj, key) {
    if (sourceObj.labels.includes(key)) {
      sourceObj.labels.find((item, index) => {
        if (item === key) { sourceObj.data[index]++; }
      });
    } else {
      sourceObj.labels.push(key);
      sourceObj.data.push(1);
    }
  }

  barChartSelection(sourceObj, key, dataLabel) {
    let keyIndex;
    // If source object labels include current key, remember its index for chart data binding by index
    if (sourceObj.labels.includes(key)) {
      keyIndex = sourceObj.labels.findIndex(item => item === key);
    } else {
      sourceObj.labels.push(key);
      keyIndex = sourceObj.labels.length - 1;
    }

    let dataLabelIndex;
    // Find data label index if exists
    dataLabelIndex = sourceObj.dataList.findIndex((item) => item.label === dataLabel);

    if (dataLabelIndex >= 0) {
      sourceObj.dataList[dataLabelIndex].data[keyIndex] =
        !sourceObj.dataList[dataLabelIndex].data[keyIndex] ? 1
          : sourceObj.dataList[dataLabelIndex].data[keyIndex] + 1;
    } else {
      sourceObj.dataList.push({data: [], label: dataLabel});
      sourceObj.dataList[sourceObj.dataList.length - 1].data[keyIndex] = 1;
      // Clear the first empty element
      if (sourceObj.dataList[0].label === '') { sourceObj.dataList.shift(); }
    }
  }

  ngOnDestroy() {
    this.pagesLoadedSubscription.unsubscribe();
  }

}
