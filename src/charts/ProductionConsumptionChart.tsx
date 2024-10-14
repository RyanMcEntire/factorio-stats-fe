import React from "react";
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
import { ProductionConsumptionItem } from "../types.ts";

interface ChartData {
  tick: string;
  relativeTime: number;
  [key: string]: number | string;
}

interface ProductionConsumptionChartProps {
  data: ProductionConsumptionItem[];
  title: string;
}

const colors = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7300",
  "#a4de6c",
  "#d0ed57",
  "#83a6ed",
  "#8dd1e1",
  "#82ca9d",
  "#a4de6c",
];

export const ProductionConsumptionChart: React.FC<
  ProductionConsumptionChartProps
> = ({ data, title }) => {
  const processedData = React.useMemo(() => {
    const groupedByTick: { [tick: string]: ChartData } = {};

    data.forEach((item) => {
      if (!groupedByTick[item.tick]) {
        groupedByTick[item.tick] = { tick: item.tick, relativeTime: 0 };
      }
      groupedByTick[item.tick][item.item] = item.delta_amount;
    });

    const sortedData = Object.values(groupedByTick).sort(
      (a, b) => Number(b.tick) - Number(a.tick),
    );
    const newestTick = Number(sortedData[0].tick);

    sortedData.forEach((item) => {
      item.relativeTime = (newestTick - Number(item.tick)) / 60; // Convert to seconds
    });

    return sortedData.reverse(); // Reverse to have oldest data first
  }, [data]);

  const items = React.useMemo(
    () => Array.from(new Set(data.map((item) => item.item))),
    [data],
  );

  const formatXAxis = (relativeTime: number) => {
    const minutes = Math.floor(relativeTime / 60);
    const seconds = Math.floor(relativeTime % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")} ago`;
  };

  return (
    <div style={{ width: "100%", height: 400 }}>
      <h2>{title}</h2>
      <ResponsiveContainer>
        <LineChart data={processedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="relativeTime"
            tickFormatter={formatXAxis}
            label={{
              value: "Time ago (minutes:seconds)",
              position: "insideBottom",
              offset: -10,
            }}
          />
          <YAxis
            label={{
              value: "Delta Amount",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip
            formatter={(value, name, props) => [
              `${value}`,
              `${name} (${formatXAxis(props.payload.relativeTime)})`,
            ]}
          />
          <Legend />
          {items.map((item, index) => (
            <Line
              key={item}
              type="monotone"
              dataKey={item}
              stroke={colors[index % colors.length]}
              activeDot={{ r: 8 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
