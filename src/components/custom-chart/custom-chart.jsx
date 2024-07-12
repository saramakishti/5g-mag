import Chart from 'react-apexcharts';

// This is just a wrapper for the ApexCharts component
const CustomChart = (props) => {
  const { chartConfig, chartType = 'line' } = props;
  const { series, categories, title } = chartConfig;

  const options = {
    chart: {
      type: chartType,
    },
    xaxis: {
      categories: categories,
    },
    title: {
      text: title,
    },
  };

  return (
    <div className='bg-white p-4 rounded-lg shadow-md'>
      <Chart options={options} series={series} type={chartType} height='300' />
    </div>
  );
};
export default CustomChart;
