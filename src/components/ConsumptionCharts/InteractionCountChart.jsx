import React from 'react';
import Chart from 'react-apexcharts';

const InteractionCountChart = ({ data }) => {
  const chartOptions = {
    chart: {
      type: 'bar',
    },
    xaxis: {
      categories: data.map((item) => item.contentId),
    },
    title: {
      text: 'Interaction Count per Content',
    },
  };

  const chartSeries = [
    {
      name: 'Interaction Count',
      data: data.map((item) => item.interactionCount),
    },
  ];

  return (
    <div className='bg-white p-4 rounded-lg shadow-md'>
      <h2 className='text-lg font-semibold mb-4'>Interaction Count</h2>
      <Chart
        options={chartOptions}
        series={chartSeries}
        type='bar'
        height='300'
      />
    </div>
  );
};

export default InteractionCountChart;
