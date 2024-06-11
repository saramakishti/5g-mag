'use client';

import ViewingDurationChart from '@/components/ConsumptionCharts/ViewingDurationChart';
import { mockConsumptionData } from '../mock/consumption-data';
import InteractionCountChart from '@/components/ConsumptionCharts/InteractionCountChart';
import UserEngagementChart from '@/components/ConsumptionCharts/UserEngagementChart';

const ConsumptionReports = () => {
  return (
    <div className='p-4'>
      <h2 className='text-xl mb-4'>
        These are the Consumption Reports based on your 5G media consumption
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <ViewingDurationChart data={mockConsumptionData} />
        <InteractionCountChart data={mockConsumptionData} />
        <UserEngagementChart data={mockConsumptionData} />
      </div>
    </div>
  );
};

export default ConsumptionReports;
