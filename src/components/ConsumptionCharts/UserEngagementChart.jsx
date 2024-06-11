import React from 'react';
import Chart from 'react-apexcharts';
import { format } from 'date-fns';

const UserEngagementChart = ({ data }) => {
  const chartOptions = {
    chart: {
      type: 'line',
    },
    xaxis: {
      categories: data.map((item) =>
        format(new Date(item.viewTimestamp), 'Pp')
      ),
    },
    title: {
      text: 'User Engagement Over Time',
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
      <h2 className='text-lg font-semibold mb-4'>User Engagement</h2>
      <Chart
        options={chartOptions}
        series={chartSeries}
        type='line'
        height='300'
      />
    </div>
  );
};

export default UserEngagementChart;
