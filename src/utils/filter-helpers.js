/**
 * In this file, we configure the filter options that are shown on the QoE + Consumption Reports pages.
 * Since we are not using TypeScript, objects ChartType and DataSource serve as enums in order to maintain the standard in
 * filter selections.
 * For the filter options, it is necessary to supply both the key and value properties to render the Select component.
 */

const ChartType = {
  individual: 'individual',
  total: 'total',
};

const ChartTypeOptions = [
  { key: ChartType.individual, value: 'Individual' },
  { key: ChartType.total, value: 'Total' },
];

const DataSource = {
  mock1: 'mock1',
  mock2: 'mock2',
  mock3: 'mock3',
  mock4: 'mock4',
};

const DataSourceOptions = [
  { key: DataSource.mock1, value: 'Sample Data 1' },
  { key: DataSource.mock2, value: 'Sample Data 2' },
  { key: DataSource.mock3, value: 'Sample Data 3' },
  { key: DataSource.mock4, value: 'Sample Data 4' },
];

export { ChartType, ChartTypeOptions, DataSource, DataSourceOptions };
