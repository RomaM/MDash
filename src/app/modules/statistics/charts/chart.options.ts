import {ChartOptions} from 'chart.js';

export {ChartOptions} from 'chart.js';

export const brandsOptions: ChartOptions = {
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

export const systemOptions: ChartOptions = {
  responsive: true,
  legend: {
    position: 'bottom',
    labels: {
      fontColor: '#fff'
    }
  },
  scales : {
    yAxes: [{
      ticks: {
        stepSize: 10,
        suggestedMax: 50,
        min: 0
      }
    }]
  },
  plugins: {
    datalabels: {
      anchor: 'end',
      align: 'end',
    }
  }
};
