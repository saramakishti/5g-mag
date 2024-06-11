'use client';
import {
  mockBitrateData,
  mockLatencyData,
  mockQoEData,
} from '../mock/qoe-data';
import LatencyChart from '@/components/QoECharts/LatencyChart';
import BitrateChart from '@/components/QoECharts/BitrateChart';
import QoEChart from '@/components/QoECharts/QoeChart';

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
    </div>
  );
};

export default QoEReports;
