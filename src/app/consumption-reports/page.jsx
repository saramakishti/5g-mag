'use client';
import React, { useState } from 'react';
import {
  ChartType,
  ChartTypeOptions,
  DataSource,
  DataSourceOptions,
} from '../../utils/filter-helpers';
import { Select } from '@/components/select/select';
import { ConsumptionReportsCharts } from './consumption-reports-charts';

const ConsumptionReports = () => {
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
        These are the Consumption Reports based on your 5G media consumption
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
      <ConsumptionReportsCharts chartType={chartType} dataSource={dataSource} />
    </div>
  );
};

export default ConsumptionReports;
