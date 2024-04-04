"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { Separator } from "./ui/separator";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const PopulationChart = () => {
  const [data, setData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [minPopulation, setMinPopulation] = useState(0);
  const [maxPopulation, setMaxPopulation] = useState(0);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://datausa.io/api/data?drilldowns=Nation&measures=Population"
      );
      const data = response.data;

      const modifiedData = data.data.map((item) => ({
        name: item.Year, // Modify name to Year
        population: item.Population, // Modify population with formatted population
      }));
      setData(data);
      setChartData(modifiedData.reverse());

      // Find min and max population values
      const populations = data.data.map((item) => item.Population);
      const min = Math.min(...populations);
      const max = Math.max(...populations);
      setMinPopulation(min);
      setMaxPopulation(max);

      console.log({ modifiedData });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatPopulation = (value) => {
    if (value >= 1e9) {
      return (value / 1e9).toFixed(0) + "B";
    } else if (value >= 1e6) {
      return (value / 1e6).toFixed(0) + "M";
    } else if (value >= 1e3) {
      return (value / 1e3).toFixed(0) + "K";
    } else {
      return value.toFixed(0);
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-4 bg-black/90 flex flex-col gap-4 rounded-md">
          <p className="text-medium text-lg">
            Year: <span>{label}</span>
          </p>
          <p className="text-md font-bold text-green-400">
            Poulation:
            <span className="ml-2">{payload[0].value.toLocaleString()}</span>
          </p>
        </div>
      );
    }
  };

  return (
    <div className="rounded-xl bg-neutral-900 p-5 md:col-span-2 flex flex-col gap-5 text-white">
      {data.data ? (
        <>
          <h1 className="text-3xl font-bold">
            {data.source && data.source[0].measures[0]}
          </h1>
          <h4>
            {`Source: ${
              data.source && data.source[0].annotations.source_name
            } - ${
              data.source && data.source[0].annotations.source_description
            }`}
          </h4>
          <Separator className="bg-neutral-700 h-[1.5px]" />
          <ResponsiveContainer width="100%" height={470}>
            <LineChart
              margin={{ bottom: 50, top: 10, left: 30 }}
              data={chartData}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                tickMargin={18}
                dataKey="name"
                label={{
                  value: "Year",
                  position: "bottom",
                  fill: "#B3E5B3",
                  fontSize: 20,
                  offset: 20,
                }}
                tick={{
                  fill: "#B3E5B3",
                }}
              />
              <YAxis
                label={{
                  value: "Population",
                  angle: -90,
                  position: "insideLeft",
                  fill: "#B3E5B3",
                  fontSize: 20,
                  offset: -20,
                }}
                tick={{
                  fill: "#B3E5B3",
                }}
                tickMargin={8}
                tickLine={false}
                minTickGap={10}
                tickCount={15}
                interval={1}
                domain={[minPopulation, maxPopulation]}
                allowDataOverflow
                tickFormatter={(value) => formatPopulation(value)}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" iconSize={25} />
              <Line
                type="monotone"
                dataKey="population"
                stroke="#77DD77"
                strokeWidth={2.5}
              />
            </LineChart>
          </ResponsiveContainer>
        </>
      ) : (
        <div className="flex flex-col gap-16 z-10">
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-56" />
        </div>
      )}
    </div>
  );
};

export default PopulationChart;
