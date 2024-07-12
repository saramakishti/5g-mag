'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Select } from '@/components/select/select';
import {
  ChartType,
  ChartTypeOptions,
  DataSource,
  DataSourceOptions,
} from '../../utils/filter-helpers';
// Dynamically import QoEReportsCharts with ssr: false
const QoEReportsCharts = dynamic(() => import('./qoe-reports-charts'), {
  ssr: false,
});

const QoEReports = () => {
  const [chartType, setChartType] = useState(ChartType.individual); //set initial state for chart type filter
  const [dataSource, setDataSource] = useState(DataSource.mock1); //set initial state for data source filter

  const onChartTypeSelection = (event) => {
    setChartType(event.target.value);
  };

  const onDataSourceSelection = (event) => {
    setDataSource(event.target.value);
  };

  return (
    <div className='p-4'>
      <h2 className='text-xl mb-4 text-center'>
        These are the QoE Reports based on your 5G media consumption
      </h2>
      <div className='flex space-x-4'>
        {/* Filter to Select the Chart Type */}
        <Select
          selectId='chart-type'
          selectLabel='Chart Type'
          selectOptions={ChartTypeOptions}
          onChange={onChartTypeSelection}
          selectValue={chartType}
          className='w-1/2'
        />
        {/* Filter to Select the Data Source */}
        <Select
          selectId='mock-data'
          selectLabel='Data Source'
          selectOptions={DataSourceOptions}
          onChange={onDataSourceSelection}
          selectValue={dataSource}
          className='w-1/2'
          disabled={chartType === ChartType.total}
        />
      </div>
      <QoEReportsCharts chartType={chartType} dataSource={dataSource} />
    </div>
  );
};

export default QoEReports;
