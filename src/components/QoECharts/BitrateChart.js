import React from 'react';
import Chart from 'react-apexcharts';
import { format } from 'date-fns';

const BitrateChart = ({ data }) => {
  const chartOptions = {
    chart: {
      type: 'line',
    },
    xaxis: {
      categories: data.map((item) => format(new Date(item.timestamp), 'Pp')),
    },
    title: {
      text: 'Bitrate Over Time',
    },
  };

  const chartSeries = [
    {
      name: 'Bitrate (kbps)',
      data: data.map((item) => item.bitrate),
    },
  ];

  return (
    <div className='bg-white p-4 rounded-lg shadow-md'>
      <h2 className='text-lg font-semibold mb-4'>Bitrate</h2>
      <Chart
        options={chartOptions}
        series={chartSeries}
        type='line'
        height='300'
      />
    </div>
  );
};

export default BitrateChart;
