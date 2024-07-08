export function calculateAverages(
  mockQoEData,
  mockLatencyData,
  mockBitrateData,
  mockConsumptionData = []
) {
  // TODO: fix me
  const avgQoE = mockQoEData.reduce((acc, curr) => {
    const timestamp = curr.timestamp;
    if (acc[timestamp]) {
      acc[timestamp].push(curr.playbackQuality);
    } else {
      acc[timestamp] = [curr.playbackQuality];
    }
    return acc;
  }, {});

  for (const key in avgQoE) {
    avgQoE[key] = avgQoE[key].reduce((a, b) => a + b) / avgQoE[key].length;
  }

  // calculate average latency
  const avgLatency = mockLatencyData.reduce((acc, curr) => {
    const timestamp = curr.timestamp;
    if (acc[timestamp]) {
      acc[timestamp].push(curr.latency);
    } else {
      acc[timestamp] = [curr.latency];
    }
    return acc;
  }, {});

  for (const key in avgLatency) {
    avgLatency[key] =
      avgLatency[key].reduce((a, b) => a + b) / avgLatency[key].length;
  }

  // calculate average bitrate
  const avgBitrate = mockBitrateData.reduce((acc, curr) => {
    const timestamp = curr.timestamp;
    if (acc[timestamp]) {
      acc[timestamp].push(curr.bitrate);
    } else {
      acc[timestamp] = [curr.bitrate];
    }
    return acc;
  }, {});
  for (const key in avgBitrate) {
    avgBitrate[key] =
      avgBitrate[key].reduce((a, b) => a + b) / avgBitrate[key].length;
  }

  // TODO: calculate average consumption correctly
  // calculate average consumption
  const avgConsumption = mockConsumptionData.reduce((acc, curr) => {
    const timestamp = curr.timestamp;
    if (acc[timestamp]) {
      acc[timestamp].push(curr.playbackQuality);
    } else {
      acc[timestamp] = [curr.playbackQuality];
    }
    return acc;
  }, {});

  for (const key in avgConsumption) {
    avgConsumption[key] =
      avgConsumption[key].reduce((a, b) => a + b) / avgConsumption[key].length;
  }

  return {
    avgQoE: mockQoEData,
    avgLatency: mockLatencyData,
    avgBitrate: mockBitrateData,
    avgConsumption: avgConsumption,
  };
}
