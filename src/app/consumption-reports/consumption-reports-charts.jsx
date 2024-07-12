'use client';
import { format } from 'date-fns';
import { CustomChart } from '@/components/custom-chart/custom-chart';
import { ConsumptionDataMocks } from '../mock/consumption-mocks/consumption-data-mock';
import { ChartType } from '@/utils/filter-helpers';
import { getAverageValuesPerTimestamp, mergeDataArrays } from '@/utils/helpers';
import {
  ConsumptionChartTypes,
  getChartConfig,
} from '../../utils/chart-helpers';

export const ConsumptionReportsCharts = (props) => {
  const { chartType, dataSource } = props;

  // Get Interaction Count chart config based on data source
  const interactionCountConfig = getChartConfig(
    ConsumptionDataMocks[dataSource],
    ConsumptionChartTypes.interactionCount
  );

  // Get User Engagement chart config based on data source
  const userEngagementConfig = getChartConfig(
    ConsumptionDataMocks[dataSource],
    ConsumptionChartTypes.userEngagement
  );

  // Get Viewing Duration chart config based on data source
  const viewingDurationConfig = getChartConfig(
    ConsumptionDataMocks[dataSource],
    ConsumptionChartTypes.viewingDuration
  );

  return (
    <div>
      {chartType === ChartType.individual ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          <CustomChart chartType='bar' chartConfig={interactionCountConfig} />
          <CustomChart chartConfig={userEngagementConfig} />
          <CustomChart chartType='bar' chartConfig={viewingDurationConfig} />
        </div>
      ) : (
        <div>
          <TotalConsumptionChart consumptionData={ConsumptionDataMocks} />
        </div>
      )}
    </div>
  );
};

const TotalConsumptionChart = (props) => {
  const { consumptionData } = props;

  const totalConsumptionData = mergeDataArrays(consumptionData);

  // Calculate average Consumption metrics
  const avgConsumption = getAverageValuesPerTimestamp(totalConsumptionData, [
    'viewingDuration',
    'interactionCount',
  ]);

  return (
    <div>
      <CustomChart
        chartConfig={{
          series: [
            {
              name: 'Viewing Duration (seconds)',
              data: avgConsumption.map((item) => item.viewingDuration),
            },
            {
              name: 'Interaction Count Per Content',
              data: avgConsumption.map((item) => item.interactionCount),
            },
          ],
          categories: avgConsumption.map((item) =>
            format(new Date(item.timestamp), 'Pp')
          ),
          title: 'Total Average Metrics for Consumption Over Time',
        }}
      />
    </div>
  );
};
