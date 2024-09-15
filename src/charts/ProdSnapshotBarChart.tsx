import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import snapshotData from "../../mockSnapshotData.json";
import { SnapshotData } from "../types";

type ProductionItem = { name: string; value: number };

const CustomizedAxisTick: React.FC<any> = (props) => {
  const { x, y, payload } = props;
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={-4}
        y={0}
        dy={8}
        textAnchor="end"
        fill="#666"
        transform="rotate(-45)"
        style={{ fontSize: "12px" }}
      >
        {payload.value}
      </text>
    </g>
  );
};

export default function SnapshotBarChart() {
  const [data, setData] = useState<SnapshotData | null>(null);

  useEffect(() => {
    setData(snapshotData as SnapshotData);
  }, []);

  if (!data) return <div>Loading...</div>;

  const productionData: ProductionItem[] = Object.entries(data.production)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart
        data={productionData}
        margin={{ top: 20, right: 30, left: 20, bottom: 100 }}
      >
        <XAxis dataKey="name" tick={<CustomizedAxisTick />} interval={0} />
        <YAxis />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
