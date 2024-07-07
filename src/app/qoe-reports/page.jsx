'use client';
import dynamic from 'next/dynamic';
import { mockQoEData, mockLatencyData, mockBitrateData } from '../mock/data';

// Dynamically import charts with no SSR to ensure they run only on the client side
const QoEChart = dynamic(() => import('@/components/QoECharts/QoEChart'), { ssr: false });
const LatencyChart = dynamic(() => import('@/components/QoECharts/LatencyChart'), { ssr: false });
const BitrateChart = dynamic(() => import('@/components/QoECharts/BitrateChart'), { ssr: false });
const TotalChart = dynamic(() => import('@/components/QoECharts/TotalChart'), { ssr: false });



const QoEReports = () => {
  return (
    <div className='p-4'>
      <h2 className='text-xl mb-4'>
        These are the QoE Reports based on your 5G media consumption
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <QoEChart data={mockQoEData} />
        <LatencyChart data={mockLatencyData} />
        <BitrateChart data={mockBitrateData} />
      </div>
      <TotalChart QoEData={mockQoEData}  latencyData={mockLatencyData} bitrateData={mockBitrateData}/>
    </div>
  );
};

export default QoEReports;
