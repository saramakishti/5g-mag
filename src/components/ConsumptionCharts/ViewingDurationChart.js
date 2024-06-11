import React from 'react';
import Chart from 'react-apexcharts';

const ViewingDurationChart = ({ data }) => {
  const chartOptions = {
    chart: {
      type: 'bar',
    },
    xaxis: {
      categories: data.map((item) => item.contentId),
    },
    title: {
      text: 'Viewing Duration per Content',
    },
  };

  const chartSeries = [
    {
      name: 'Viewing Duration (seconds)',
      data: data.map((item) => item.viewingDuration),
    },
  ];

  return (
    <div className='bg-white p-4 rounded-lg shadow-md'>
      <h2 className='text-lg font-semibold mb-4'>Viewing Duration</h2>
      <Chart
        options={chartOptions}
        series={chartSeries}
        type='bar'
        height='300'
      />
    </div>
  );
};

export default ViewingDurationChart;
