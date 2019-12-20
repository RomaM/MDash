import { Component, OnInit } from '@angular/core';
import {ChartOptions, ChartType} from 'chart.js';
import {Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip} from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {

  brandsChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
      labels: {
        fontColor: '#fff'
      }
    },
    plugins: {
      datalabels: {
        color: '#fff',
        textAlign: 'center',
        font: {
          weight: 'bold'
        },
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex] + ':\n' + value;
          return label;
        },
      },
    }
  };
  brandsChartLabels: Label[] = ['TradeLTD', 'TradeFW', 'RCPro'];
  brandsChartData: number[] = [39, 12, 67];
  brandsChartType: ChartType = 'pie';
  brandsChartLegend = true;
  brandsChartPlugins = [pluginDataLabels];
  brandsChartColors = [
    {
      backgroundColor: ['#6e00ff', '#01b60b', '#dc005a'],
      borderWidth: 1,
      borderColor: '#303030',


      // backgroundColor?: string | string[];
      // borderWidth?: number | number[];
      // borderColor?: string | string[];
      // borderCapStyle?: string;
      // borderDash?: number[];
      // borderDashOffset?: number;
      // borderJoinStyle?: string;
      // pointBorderColor?: string | string[];
      // pointBackgroundColor?: string | string[];
      // pointBorderWidth?: number | number[];
      // pointRadius?: number | number[];
      // pointHoverRadius?: number | number[];
      // pointHitRadius?: number | number[];
      // pointHoverBackgroundColor?: string | string[];
      // pointHoverBorderColor?: string | string[];
      // pointHoverBorderWidth?: number | number[];
      // pointStyle?: string | string[];
      // hoverBackgroundColor?: string | string[];
      // hoverBorderColor?: string | string[];
      // hoverBorderWidth?: number;
    }
  ];

  constructor() {

  }

  ngOnInit() {
  }

}
