import ReactECharts from 'echarts-for-react';
import { formatDateString } from '../../utils/utils';

interface ChartData {
  xData: string[];
  yData: number[];
}

const MrrMovementsChart = (data: ChartData) => {
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
        formatter: (value: string) => value.substring(0, 6),
      }
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: yData,
        type: 'line',
        smooth: true,
      }
    ],
    grid: {
			right: '10px',
			left: '30px',
			bottom: '25px',
			top: '25px',
		}
  };

  return <ReactECharts option={option} style={{ height: '250px', width: '100%' }} />;
};

export default MrrMovementsChart;
