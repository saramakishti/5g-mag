'use client';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { calculateAverages } from '@/utils/helpers';
import { mockQoEData as mockQoEData1, mockLatencyData as mockLatencyData1, mockBitrateData as mockBitrateData1 } from '../mock/data';
import { mockQoEData as mockQoEData2, mockLatencyData as mockLatencyData2, mockBitrateData as mockBitrateData2 } from '../mock/data2';
import { mockQoEData as mockQoEData3, mockLatencyData as mockLatencyData3, mockBitrateData as mockBitrateData3 } from '../mock/data3';
import { mockQoEData as mockQoEData4, mockLatencyData as mockLatencyData4, mockBitrateData as mockBitrateData4 } from '../mock/data4';

// Dynamically import charts with no SSR to ensure they run only on the client side
const QoEChart = dynamic(() => import('@/components/QoECharts/QoEChart'), { ssr: false });
const LatencyChart = dynamic(() => import('@/components/QoECharts/LatencyChart'), { ssr: false });
const BitrateChart = dynamic(() => import('@/components/QoECharts/BitrateChart'), { ssr: false });
const TotalChart = dynamic(() => import('@/components/QoECharts/TotalChart'), { ssr: false });

const QoEReports = () => {
  const [chartType, setChartType] = useState('total');
  const [dataSource, setDataSource] = useState('mock1');
  const [mockQoEData, setMockQoEData] = useState(mockQoEData1);
  const [mockLatencyData, setMockLatencyData] = useState(mockLatencyData1);
  const [mockBitrateData, setMockBitrateData] = useState(mockBitrateData1);

  useEffect(() => {
    switch(dataSource) {
      case 'mock1':
        setMockQoEData(mockQoEData1);
        setMockLatencyData(mockLatencyData1);
        setMockBitrateData(mockBitrateData1);
        break;
      case 'mock2':
        setMockQoEData(mockQoEData2);
        setMockLatencyData(mockLatencyData2);
        setMockBitrateData(mockBitrateData2);
        break;
      case 'mock3':
        setMockQoEData(mockQoEData3);
        setMockLatencyData(mockLatencyData3);
        setMockBitrateData(mockBitrateData3);
        break;
      case 'mock4':
        setMockQoEData(mockQoEData4);
        setMockLatencyData(mockLatencyData4);
        setMockBitrateData(mockBitrateData4);
        break;
      case 'all':
        const QoEData = mockQoEData1.concat(mockQoEData2, mockQoEData3, mockQoEData4);
        const LatencyData = mockLatencyData1.concat(mockLatencyData2, mockLatencyData3, mockLatencyData4);
        const BitrateData = mockBitrateData1.concat(mockBitrateData2, mockBitrateData3, mockBitrateData4);

        const avg = calculateAverages(QoEData, LatencyData, BitrateData);
        setMockQoEData(avg.avgQoE);
        setMockLatencyData(avg.avgLatency);
        setMockBitrateData(  avg.avgBitrate);
        break;
    }
  }, [dataSource]);

  const QOEOptions = () => {
    return (
      <div>
        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
        >
          <option value='total'>Total</option>
          <option value='individual'>Individual</option>
        </select>
  
        <select
          value={dataSource}
          onChange={(e) => setDataSource(e.target.value)}
        >
          <option value='all'>All(AVG)</option>
          <option value='mock1'>Mock 1</option>
          <option value='mock2'>Mock 2</option>
          <option value='mock3'>Mock 3</option>
          <option value='mock4'>Mock 4</option>
        </select>
      </div>
    );
  };

  return (
    <div className='p-4'>
      <h2 className='text-xl mb-4'>
        These are the QoE Reports based on your 5G media consumption
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <QOEOptions />
        <QoEChart data={mockQoEData} />
        <LatencyChart data={mockLatencyData} />
        <BitrateChart data={mockBitrateData} />
      </div>
      <TotalChart QoEData={mockQoEData} latencyData={mockLatencyData} bitrateData={mockBitrateData} />
    </div>
  );
};

export default QoEReports;
