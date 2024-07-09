"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { mockConsumptionData as mockConsumptionData1 } from "../mock/data";
import { mockConsumptionData as mockConsumptionData2 } from "../mock/data2";
import { mockConsumptionData as mockConsumptionData3 } from "../mock/data3";
import { mockConsumptionData as mockConsumptionData4 } from "../mock/data4";

// Dynamically import charts with no SSR to ensure they run only on the client side
const ViewingDurationChart = dynamic(
  () => import("@/components/ConsumptionCharts/ViewingDurationChart"),
  { ssr: false }
);
const InteractionCountChart = dynamic(
  () => import("@/components/ConsumptionCharts/InteractionCountChart"),
  { ssr: false }
);
const UserEngagementChart = dynamic(
  () => import("@/components/ConsumptionCharts/UserEngagementChart"),
  { ssr: false }
);

const ConsumptionReports = () => {
  const [dataSource, setDataSource] = useState("mock1");
  const [mockConsumptionData, setMockConsumptionData] =
    useState(mockConsumptionData1);

  useEffect(() => {
    switch (dataSource) {
      case "mock1":
        setMockConsumptionData(mockConsumptionData1);
        break;
      case "mock2":
        setMockConsumptionData(mockConsumptionData2);
        break;
      case "mock3":
        setMockConsumptionData(mockConsumptionData3);
        break;
      case "mock4":
        setMockConsumptionData(mockConsumptionData4);
        break;
    }
  }, [dataSource]);

  const QOEOptions = () => {
    return (
      <form class="max-w-sm">
        <label
          for="countries"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select an option
        </label>
        <select
          value={dataSource}
          onChange={(e) => setDataSource(e.target.value)}
          id="countries"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
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
        These are the Consumption Reports based on your 5G media consumption
      </h2>
      <QOEOptions />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ViewingDurationChart data={mockConsumptionData} />
        <InteractionCountChart data={mockConsumptionData} />
        <UserEngagementChart data={mockConsumptionData} />
      </div>
    </div>
  );
};

export default ConsumptionReports;
