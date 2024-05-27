import ReactECharts from 'echarts-for-react';
import { formatDateString1, formatDateString2 } from '../../utils/functions';

interface ChartData {
  xData: string[];
  yData: number[];
}

const MrrMovementsChart = (data: ChartData) => {

  const _tooltipFormatter = (item: any) => {
    const date = formatDateString1(item[0].name);
    const sum = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item[0].value);
    return `<div><span class="text-xs">${date}</span><br/><span></span>${sum}</div>`;
  };

  const xData = data.xData.map((item) => formatDateString2(item));
  const yData = data.yData;

  const option = {
    tooltip: {
      trigger: 'axis',
      formatter: _tooltipFormatter
    },
    xAxis: {
      type: 'category',
      data: xData,
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: yData,
        type: 'line',
        smooth: true
      }
    ],
    grid: {
			right: '10px',
			left: '30px',
			bottom: '25px',
			top: '25px'
		}
  };

  return <ReactECharts option={option} style={{ height: '300px', width: '100%' }} />;
};

export default MrrMovementsChart;
