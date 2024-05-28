import ReactECharts from 'echarts-for-react';

interface SubscriptionCountChartData {
  last30Days: number;
  lastMonth: number;
}

const SubscriberCountChart = (data: SubscriptionCountChartData) => {
  console.log(data)
  const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      show: false,
    },
    graphic: [
      {
        type: 'text',
        left: 'center',
        top: '40%',
        style: {
          text: data.last30Days,
          textAlign: 'center',
          fill: '#333',
          fontSize: '2rem',
          fontFamily: 'Space Grotesk',
          fontWeight: 600,
        }
      },
      {
        type: 'text',
        left: 'center',
        top: '55%',
        style: {
          text: 'Subscribers',
          textAlign: 'center',
          fill: '#333',
          fontSize: '1rem',
          fontFamily: 'Space Grotesk',
        }
      }
    ],
    series: [
      {
        name: 'Subscribers',
        type: 'pie',
        radius: ['70%', '90%'],
        avoidLabelOverlap: false,
        padAngle: 5,
        itemStyle: {
          borderRadius: '50%'
        },
        label: {
          show: false,
          position: 'center'
        },
        labelLine: {
          show: false
        },
        data: [
          {
            name: 'Last Month',
            value: data.lastMonth,
            itemStyle: {
              color: '#accfec'
            }
          },
          {
            name: 'Last 30 Days',
            value: data.last30Days,
            itemStyle: {
              color: '#2f88d0'
            }
          },
        ]
      }
    ],
  };

  return <ReactECharts option={option} style={{ height: '220px', width: '100%' }} />;
};

export default SubscriberCountChart;
