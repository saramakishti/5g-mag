/**
 * In order to simplify and not repeat the rendering of the charts in QoE + Consumption reports, the helper functions below prepare the
 * datasets and configurations for proper chart display.
 */
import { format } from 'date-fns';

const generateChartConfig = (
  data,
  seriesKeys,
  title,
  categoryKey = 'timestamp'
) => {
  const series = seriesKeys.map((key) => ({
    name: key.label,
    data: data.map((item) => item[key.dataKey]),
  }));

  const categories = data.map((item) =>
    categoryKey === 'timestamp'
      ? format(new Date(item.timestamp), 'Pp')
      : item[categoryKey]
  );

  return { series, categories, title };
};

export const getChartConfig = (data, type) => {
  const configs = {
    qoe: {
      seriesKeys: [
        { label: 'Buffering Duration (ms)', dataKey: 'bufferingDuration' },
        { label: 'Playback Quality', dataKey: 'playbackQuality' },
      ],
      chartTitle: 'QoE Over Time',
      categoryKey: 'timestamp',
    },
    latency: {
      seriesKeys: [{ label: 'Latency (ms)', dataKey: 'latency' }],
      chartTitle: 'Latency Over Time',
      categoryKey: 'timestamp',
    },
    bitrate: {
      seriesKeys: [
        { label: 'Video Bitrate (kbit/s)', dataKey: 'videoBitrate' },
        { label: 'Audio Bitrate (kbit/s)', dataKey: 'audioBitrate' },
      ],
      chartTitle: 'Bitrate Over Time',
      categoryKey: 'timestamp',
    },
    interactionCount: {
      seriesKeys: [
        {
          label: 'Interaction Count',
          dataKey: 'interactionCount',
        },
      ],
      chartTitle: 'Interaction Count Per Content',
      categoryKey: 'contentId',
    },
    userEngagement: {
      seriesKeys: [
        {
          label: 'Viewing Duration (seconds)',
          dataKey: 'viewingDuration',
        },
      ],
      chartTitle: 'User Engagement Over Time',
      categoryKey: 'timestamp',
    },
    viewingDuration: {
      seriesKeys: [
        {
          label: 'Viewing Duration (seconds)',
          dataKey: 'viewingDuration',
        },
      ],
      chartTitle: 'Viewing Duration per Content',
      categoryKey: 'contentId',
    },
  };

  return generateChartConfig(
    data,
    configs[type].seriesKeys,
    configs[type].chartTitle,
    configs[type].categoryKey
  );
};

export const QoEChartTypes = {
  qoe: 'qoe',
  latency: 'latency',
  bitrate: 'bitrate',
  total: 'total',
};

export const ConsumptionChartTypes = {
  interactionCount: 'interactionCount',
  userEngagement: 'userEngagement',
  viewingDuration: 'viewingDuration',
};
