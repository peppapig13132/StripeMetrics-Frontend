import ReactECharts from 'echarts-for-react';
import { formatDateString } from '../../utils/utils';
import { ChartData } from '../../interfaces/interface';

const MonthlyRecurringRevenueChart = (data: ChartData) => {
  const _tooltipFormatter = (params: any) => {
    const date = formatDateString(params[0].name);
    const sum = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(params[0].value);

    return `<div><span class="text-xs">${date}</span><br/><span></span>${sum}</div>`;
  };

  const xData = data.xData.map((item) => formatDateString(item));
  const yData = data.yData;

  const option = {
    tooltip: {
      trigger: 'axis',
      formatter: _tooltipFormatter,
    },
    xAxis: {
      type: 'category',
      data: xData,
      axisLabel: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        show: false,
      },
    },
    series: [
      {
        data: yData,
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)',
          borderRadius: 50,
        },
        itemStyle: {
          borderRadius: 50,
        }
      }
    ],
    grid: {
			right: '10px',
			left: '10px',
			bottom: '25px',
			top: '25px',
		}
  };

  return <ReactECharts option={option} style={{ height: '200px', width: '100%' }} />;
};

export default MonthlyRecurringRevenueChart;
