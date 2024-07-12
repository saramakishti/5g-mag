'use client';
import { format } from 'date-fns';
import { CustomChart } from '@/components/custom-chart/custom-chart';
import { ChartType } from '../../utils/filter-helpers';
import { getChartConfig, QoEChartTypes } from '../../utils/chart-helpers';
import { getAverageValuesPerTimestamp, mergeDataArrays } from '@/utils/helpers';
import { BitrateDataMocks } from '../mock/qoe-mocks/bitrate-data-mock';
import { LatencyDataMocks } from '../mock/qoe-mocks/latency-data-mock';
import { QoEDataMocks } from '../mock/qoe-mocks/qoe-data-mock';

export const QoEReportsCharts = (props) => {
  const { chartType, dataSource } = props;

  // Get QoE chart config based on data source
  const qoeConfig = getChartConfig(QoEDataMocks[dataSource], QoEChartTypes.qoe);
  // Get Latency chart config based on data source
  const latencyConfig = getChartConfig(
    LatencyDataMocks[dataSource],
    QoEChartTypes.latency
  );
  // Get Bitrate chart config based on data source
  const bitrateConfig = getChartConfig(
    BitrateDataMocks[dataSource],
    QoEChartTypes.bitrate
  );

  return (
    <div>
      {chartType === ChartType.individual ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          <CustomChart chartConfig={qoeConfig} />
          <CustomChart chartConfig={latencyConfig} />
          <CustomChart chartConfig={bitrateConfig} />
        </div>
      ) : (
        <div>
          <TotalQoEChart
            qoeData={QoEDataMocks}
            bitrateData={BitrateDataMocks}
            latencyData={LatencyDataMocks}
          />
        </div>
      )}
    </div>
  );
};

const TotalQoEChart = (props) => {
  const { qoeData, bitrateData, latencyData } = props;

  const totalQoEData = mergeDataArrays(qoeData);
  const totalBitrateData = mergeDataArrays(bitrateData);
  const totalLatencyData = mergeDataArrays(latencyData);

  // Calculate average QoE metrics
  const avgQoE = getAverageValuesPerTimestamp(totalQoEData, [
    'bufferingDuration',
    'playbackQuality',
  ]);

  // Calculate average bitrates
  const avgBitrate = getAverageValuesPerTimestamp(totalBitrateData, [
    'audioBitrate',
    'videoBitrate',
  ]);

  // Calculate average latency
  const avgLatency = getAverageValuesPerTimestamp(totalLatencyData, [
    'latency',
  ]);

  return (
    <div>
      <CustomChart
        chartConfig={{
          series: [
            {
              name: 'Buffering Duration (ms)',
              data: avgQoE.map((item) => item.bufferingDuration),
            },
            {
              name: 'Playback Quality',
              data: avgQoE.map((item) => item.playbackQuality),
            },
            {
              name: 'Latency (ms)',
              data: avgLatency.map((item) => item.latency),
            },
            {
              name: 'Video Bitrate (kbit/s)',
              data: avgBitrate.map((item) => item.videoBitrate),
            },
            {
              name: 'Audio Bitrate (kbit/s)',
              data: avgBitrate.map((item) => item.audioBitrate),
            },
          ],
          categories: avgQoE.map((item) =>
            format(new Date(item.timestamp), 'Pp')
          ),
          title: 'Total Average Metrics for QoE Over Time',
        }}
      />
    </div>
  );
};
