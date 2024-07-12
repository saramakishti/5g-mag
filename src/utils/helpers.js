export const mergeDataArrays = (data) => {
  return Object.values(data).flat();
};

// Function to group values by timestamp for multiple keys
const groupByTimestamp = (data, keys) => {
  return data.reduce((acc, item) => {
    const { timestamp } = item;
    acc[timestamp] = acc[timestamp] || {};
    keys.forEach((key) => {
      acc[timestamp][key] = acc[timestamp][key] || [];
      acc[timestamp][key].push(item[key]);
    });
    return acc;
  }, {});
};

// Function to calculate average values for each timestamp for multiple keys
const calculateAverageValues = (groupedData) => {
  return Object.entries(groupedData).map(([timestamp, values]) => {
    const avgValues = {};
    Object.keys(values).forEach((key) => {
      avgValues[key] =
        values[key].reduce((a, b) => a + b, 0) / values[key].length;
    });
    return { timestamp, ...avgValues };
  });
};

// Main function to get average values per timestamp for specific keys
export const getAverageValuesPerTimestamp = (data, keys) => {
  const groupedData = groupByTimestamp(data, keys);
  return calculateAverageValues(groupedData);
};
