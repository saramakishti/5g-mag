"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { calculateAverages } from "@/utils/helpers";
import {
  mockQoEData as mockQoEData1,
  mockLatencyData as mockLatencyData1,
  mockBitrateData as mockBitrateData1,
} from "../mock/data";
import {
  mockQoEData as mockQoEData2,
  mockLatencyData as mockLatencyData2,
  mockBitrateData as mockBitrateData2,
} from "../mock/data2";
import {
  mockQoEData as mockQoEData3,
  mockLatencyData as mockLatencyData3,
  mockBitrateData as mockBitrateData3,
} from "../mock/data3";
import {
  mockQoEData as mockQoEData4,
  mockLatencyData as mockLatencyData4,
  mockBitrateData as mockBitrateData4,
} from "../mock/data4";

// Dynamically import charts with no SSR to ensure they run only on the client side
const QoEChart = dynamic(() => import("@/components/QoECharts/QoEChart"), {
  ssr: false,
});
const LatencyChart = dynamic(
  () => import("@/components/QoECharts/LatencyChart"),
  { ssr: false }
);
const BitrateChart = dynamic(
  () => import("@/components/QoECharts/BitrateChart"),
  { ssr: false }
);
const TotalChart = dynamic(() => import("@/components/QoECharts/TotalChart"), {
  ssr: false,
});

const QoEReports = () => {
  const [chartType, setChartType] = useState("total");
  const [dataSource, setDataSource] = useState("mock1");
  const [mockQoEData, setMockQoEData] = useState(mockQoEData1);
  const [mockLatencyData, setMockLatencyData] = useState(mockLatencyData1);
  const [mockBitrateData, setMockBitrateData] = useState(mockBitrateData1);

  useEffect(() => {
    switch (dataSource) {
      case "mock1":
        setMockQoEData(mockQoEData1);
        setMockLatencyData(mockLatencyData1);
        setMockBitrateData(mockBitrateData1);
        break;
      case "mock2":
        setMockQoEData(mockQoEData2);
        setMockLatencyData(mockLatencyData2);
        setMockBitrateData(mockBitrateData2);
        break;
      case "mock3":
        setMockQoEData(mockQoEData3);
        setMockLatencyData(mockLatencyData3);
        setMockBitrateData(mockBitrateData3);
        break;
      case "mock4":
        setMockQoEData(mockQoEData4);
        setMockLatencyData(mockLatencyData4);
        setMockBitrateData(mockBitrateData4);
        break;
      case "all":
        const QoEData = mockQoEData1.concat(
          mockQoEData2,
          mockQoEData3,
          mockQoEData4
        );
        const LatencyData = mockLatencyData1.concat(
          mockLatencyData2,
          mockLatencyData3,
          mockLatencyData4
        );
        const BitrateData = mockBitrateData1.concat(
          mockBitrateData2,
          mockBitrateData3,
          mockBitrateData4
        );

        const avg = calculateAverages(QoEData, LatencyData, BitrateData);
        setMockQoEData(avg.avgQoE);
        setMockLatencyData(avg.avgLatency);
        setMockBitrateData(avg.avgBitrate);
        break;
    }
  }, [dataSource]);

  const QOEOptions = () => {
    return (
      <form class="max-w-sm">
        <label
          for="Chart Type"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select Chart Type
        </label>
        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          id="Chart Type"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="total">Total</option>
          <option value="individual">Individual</option>
        </select>

        <label
          for="mockSource"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select an option
        </label>
        <select
          value={dataSource}
          onChange={(e) => setDataSource(e.target.value)}
          id="mockSource"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="all">All</option>
          <option value="mock1">Mock 1</option>
          <option value="mock2">Mock 2</option>
          <option value="mock3">Mock 3</option>
          <option value="mock4">Mock 4</option>
        </select>
      </form>
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">
        These are the QoE Reports based on your 5G media consumption
      </h2>

      <QOEOptions />
      {chartType === "individual" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <QoEChart data={mockQoEData} />
          <LatencyChart data={mockLatencyData} />
          <BitrateChart data={mockBitrateData} />
        </div>
      )}
      {chartType === "total" && (
        <TotalChart
          QoEData={mockQoEData}
          latencyData={mockLatencyData}
          bitrateData={mockBitrateData}
        />
      )}
    </div>
  );
};

export default QoEReports;
