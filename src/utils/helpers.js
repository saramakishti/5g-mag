export function calculateAverages(
  mockQoEData,
  mockLatencyData,
  mockBitrateData,
  mockConsumptionData = []
) {
  // loop through mockQoEData and calculate bufferingDuration and playbackQuality
  const QoEPerTimeStamp = mockQoEData.reduce((acc, { timestamp, bufferingDuration, playbackQuality }) => {
    acc[timestamp] = acc[timestamp] || { bufferingDuration: 0, playbackQuality: 0 };
    acc[timestamp].bufferingDuration += bufferingDuration;
    acc[timestamp].playbackQuality += playbackQuality;
    return acc;
  }, {});
  const avgQoE = Object.entries(QoEPerTimeStamp).map(([timestamp, { bufferingDuration, playbackQuality }]) => ({
    timestamp,
    bufferingDuration: bufferingDuration / mockQoEData.length,
    playbackQuality: playbackQuality / mockQoEData.length
  }));


  // calculate average latency
  const LatencyPerTimeStamp = mockLatencyData.reduce((acc, { timestamp, latency }) => {
    acc[timestamp] = acc[timestamp] || [];
    acc[timestamp].push(latency);
    return acc;
  }, {});
  const avgLatency = Object.entries(LatencyPerTimeStamp).map(([timestamp, latencies]) => ({
    timestamp,
    latency: latencies.reduce((a, b) => a + b) / latencies.length
  }));

  // calculate average bitrate
  const BitratePerTimeStamp = mockBitrateData.reduce((acc, curr) => {
    const timestamp = curr.timestamp;
    if (acc[timestamp]) {
      acc[timestamp].push(curr.bitrate);
    } else {
      acc[timestamp] = [curr.bitrate];
    }
    return acc;
  }, {});
  const avgBitrate = Object.entries(BitratePerTimeStamp).map(([timestamp, bitrates]) => ({
    timestamp,
    bitrate: bitrates.reduce((a, b) => a + b) / bitrates.length
  }));


  // based on viewTimestamp calculate the average viewingDuration and interactionCount, add also the userId and contentId
  const ConsumptionPerTimeStamp = mockConsumptionData.reduce((acc, { userId, contentId, viewingDuration, interactionCount, viewTimestamp }) => {
    acc[viewTimestamp] = acc[viewTimestamp] || [];
    acc[viewTimestamp].push({ userId, contentId, viewingDuration, interactionCount });
    return acc;
  }, {});
  const avgConsumptionBasedOnViewTimeStamp = Object.entries(ConsumptionPerTimeStamp).map(([viewTimestamp, consumptions]) => {
    const avgViewingDuration = consumptions.reduce((a, b) => a + b.viewingDuration, 0) / consumptions.length;
    const avgInteractionCount = consumptions.reduce((a, b) => a + b.interactionCount, 0) / consumptions.length;
    return {
      viewTimestamp,
      userId: consumptions[0].userId,
      contentId: consumptions[0].contentId,
      viewingDuration: avgViewingDuration,
      interactionCount: avgInteractionCount,
    };
  });

  // base on contentId calculate the average viewingDuration and interactionCount
  const ConsumptionPerContentId = avgConsumptionBasedOnViewTimeStamp.reduce((acc, { userId, contentId, viewingDuration, interactionCount }) => {
    acc[contentId] = acc[contentId] || [];
    acc[contentId].push({ userId, viewingDuration, interactionCount });
    return acc;
  }, {});
  const avgConsumptionBasedOnContentId = Object.entries(ConsumptionPerContentId).map(([contentId, consumptions]) => {
    const avgViewingDuration = consumptions.reduce((a, b) => a + b.viewingDuration, 0) / consumptions.length;
    const avgInteractionCount = consumptions.reduce((a, b) => a + b.interactionCount, 0) / consumptions.length;
    return {
      contentId,
      viewingDuration: avgViewingDuration,
      interactionCount: avgInteractionCount,
    };
  });
 

  return {
    avgQoE: avgQoE,
    avgLatency: avgLatency,
    avgBitrate: avgBitrate,
    avgConsumption: {
      avgConsumptionBasedOnViewTimeStamp,
      avgConsumptionBasedOnContentId,
    },
  };
}
