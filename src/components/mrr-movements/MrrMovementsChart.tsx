import ReactECharts from 'echarts-for-react';
import { format } from "date-fns";

interface ChartData {
  xData: string[];
  yData: number[];
}

export const formatDateString = (dateString: string): string => {
  const date = new Date(dateString);
  return format(date, 'MMM dd, yyyy');
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

  return <ReactECharts option={option} style={{ height: '300px', width: '100%' }} />;
};

export default MrrMovementsChart;
