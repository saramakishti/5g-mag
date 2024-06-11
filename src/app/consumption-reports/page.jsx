'use client';

import dynamic from 'next/dynamic';
import { mockConsumptionData } from '../mock/data';

// Dynamically import charts with no SSR to ensure they run only on the client side
const ViewingDurationChart = dynamic(() => import('@/components/ConsumptionCharts/ViewingDurationChart'), { ssr: false });
const InteractionCountChart = dynamic(() => import('@/components/ConsumptionCharts/InteractionCountChart'), { ssr: false });
const UserEngagementChart = dynamic(() => import('@/components/ConsumptionCharts/UserEngagementChart'), { ssr: false });


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
