import React from "react";
import { useApiContext } from "../utility-components/ApiContext.tsx";
import { ProductionConsumptionItem, ApiStatus } from "../types.ts";
import { ProductionConsumptionChart } from "./ProductionConsumptionChart.tsx";

const SurfaceComponent: React.FC<{
  surfaceName: string;
  productionData: ProductionConsumptionItem[];
  consumptionData: ProductionConsumptionItem[];
}> = ({ surfaceName, productionData, consumptionData }) => (
  <div>
    <h2>Surface: {surfaceName}</h2>
    <ProductionConsumptionChart
      data={productionData}
      title={`Production - ${surfaceName}`}
    />
    <ProductionConsumptionChart
      data={consumptionData}
      title={`Consumption - ${surfaceName}`}
    />
  </div>
);

export const FactorioStats: React.FC = () => {
  const { status, data, error } = useApiContext();

  if (status === ApiStatus.Loading) {
    return <div>Loading Factorio stats...</div>;
  }

  if (status === ApiStatus.Error) {
    return <div>Error loading Factorio stats: {error?.message}</div>;
  }

  if (!data) {
    return <div>No Factorio stats available.</div>;
  }

  const surfaceNames = Object.keys(data.production);

  return (
    <div>
      <h1>Factorio Stats</h1>

      {surfaceNames.length > 0 ? (
        surfaceNames.map((surfaceName) => (
          <SurfaceComponent
            key={surfaceName}
            surfaceName={surfaceName}
            productionData={data.production[surfaceName] || []}
            consumptionData={data.consumption[surfaceName] || []}
          />
        ))
      ) : (
        <p>No surface data available.</p>
      )}

      <h2>Research</h2>
      {data.research && data.research.length > 0 ? (
        <ul>
          {data.research.map((item, index) => (
            <li key={index}>
              {item.technology} (Tick: {item.tick})
            </li>
          ))}
        </ul>
      ) : (
        <p>No research data available.</p>
      )}

      <h2>Mods</h2>
      {data.mods && data.mods.length > 0 ? (
        <ul>
          {data.mods.map((item, index) => (
            <li key={index}>
              {item.name} (Version: {item.version}, Tick: {item.tick})
            </li>
          ))}
        </ul>
      ) : (
        <p>No mod data available.</p>
      )}
    </div>
  );
};
