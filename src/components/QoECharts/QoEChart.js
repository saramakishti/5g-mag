import React from 'react';
import Chart from 'react-apexcharts';
import { format } from 'date-fns';

const QoEChart = ({ data }) => {
  const chartOptions = {
    chart: {
      type: 'line',
    },
    xaxis: {
      categories: data.map((item) => format(new Date(item.timestamp), 'Pp')),
    },
    title: {
      text: 'QoE Metrics Over Time',
    },
  };

  const chartSeries = [
    {
      name: 'Buffering Duration (ms)',
      data: data.map((item) => item.bufferingDuration),
    },
    {
      name: 'Playback Quality',
      data: data.map((item) => item.playbackQuality),
    },
  ];

  return (
    <div className='bg-white p-4 rounded-lg shadow-md'>
      <h2 className='text-lg font-semibold mb-4'>QoE Metrics</h2>
      <Chart
        options={chartOptions}
        series={chartSeries}
        type='line'
        height='300'
      />
    </div>
  );
};

export default QoEChart;
