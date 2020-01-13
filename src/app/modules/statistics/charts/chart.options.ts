import {ChartOptions} from 'chart.js';

export {ChartOptions} from 'chart.js';

const pieChartOptions: ChartOptions = {
  responsive: true,
  legend: {
    position: 'top',
    labels: {
      fontColor: 'rgba(255,255,255,0.8)'
    }
  },
  plugins: {
    datalabels: {
      color: 'rgba(255,255,255,0.8)',
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

export const brandsChartOptions = pieChartOptions;
export const langsChartOptions = pieChartOptions;

const barChartOptions: ChartOptions = {
  responsive: true,
  legend: {
    position: 'bottom',
    labels: {
      fontColor: 'rgba(255,255,255,0.8)'
    }
  },
  scales : {
    xAxes: [{
      ticks: {
        fontColor: 'rgba(255,255,255,0.8)'
      },
      // gridLines: { color: 'rgba(255,255,255,0.1)' }
    }],
    yAxes: [{
      ticks: {
        fontColor: 'rgba(255,255,255,0.8)',
        stepSize: 10,
        suggestedMax: 10,
        min: 0
      },
      // gridLines: { color: 'rgba(255,255,255,0.1)' }
    }]
  },
  plugins: {
    datalabels: {
      anchor: 'end',
      align: 'end',
      color: 'rgba(255,255,255,0.8)',
    }
  }
};

export const systemsChartOptions = barChartOptions;
export const stepsChartOptions = barChartOptions;

