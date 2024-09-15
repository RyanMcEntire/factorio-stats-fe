import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import snapshotData from "../../mockSnapshotData.json";
import { SnapshotData } from "../types";

type ProductionItem = { name: string; value: number };

export default function ProdSnapshotBarChart() {
  const [data, setData] = useState<SnapshotData | null>(null);

  useEffect(() => {
    setData(snapshotData as SnapshotData);
  }, []);

  if (!data) return <div>Loading...</div>;

  const productionData: ProductionItem[] = Object.entries(data.production)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={productionData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
