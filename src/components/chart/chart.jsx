'use client'

import dynamic from "next/dynamic";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });
import XmlReportLoader from "../../utils/xml_report_loader";
import { useEffect, useState } from "react";

export function Chart(){ 
    const [labels, setLabels] = useState([]);
    const [dataValues, setDataValues] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const loader = new XmlReportLoader();
            const { labels, dataValues } =  await loader._createBufferLevelChart();
            setLabels(loader);
            setDataValues(dataValues);
        }
        fetchData();
    }, [])

    // if labels and dataValues are not empty, you can use this code to check the values in
    const option = {
        chart: {
          id: 'apexchart-example'
        },
        xaxis: {
          categories: labels
        }
      }

    const series = [{
        name: 'series-1',
        data: dataValues
      }]

    return(
        <>
            {
                labels && dataValues &&
                <ApexChart type="line" options={option} series={series} height={200} width={500} />
            }
            {
                !labels && !dataValues &&
                <p>Loading...</p>
            }
        </>
    )
    
}